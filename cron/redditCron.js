const CronJob = require("cron").CronJob;
const axios = require("axios").default;
// const FuzzySearch = require("fuzzy-search");

const mangaLink = "https://www.reddit.com";

// ping every on every 15th minute of every hour
const redditCronJob = (db) => {
  return new CronJob(
    "*/15 * * * * *",
    // "0 */15 * * * *",
    async () => {
      try {
        const redditPosts = await axios
          .get(`${mangaLink}/r/manga.json`)
          .then((res) => {
            const posts = res.data.data.children;
            const info = posts.map((post) => ({
              title: post.data.title,
              comments: `${mangaLink}${post.data.permalink}`,
              url: post.data.url ? post.data.url : "",
              reddit_id: post.data.id,
            }));
            return info;
          });
        // const searcher = new FuzzySearch(redditPosts, ["title"]);
        // const result = searcher.search("dragon ball");
        console.log(redditPosts);
        await db("master_posts").insert({
          reddit_posts: JSON.stringify(redditPosts),
        });
        console.log(
          "You will see this message on every 15th minute of every hour."
        );
      } catch (err) {
        console.log(err);
      }
    },
    null,
    true,
    "America/Los_Angeles"
  );
};

module.exports = {
  redditCronJob,
};
