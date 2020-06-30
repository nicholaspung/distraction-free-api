const db = require('../../data/config');

const PostsService = require('../posts.service');
const MasterPostsService = require('../masterPosts.service');
const TitlesService = require('../titles.service');

const setup = (overrides = {}) => ({
  reddit_id: 'a',
  user: 'test',
  read: true,
  date: new Date('2000-01-01'),
  ...overrides,
});

/** Order matters */
describe('#read_posts model', () => {
  beforeEach(async () => {
    await db('read_posts').truncate();
    await db('titles').truncate();
    await db('master_posts').truncate();
    await db('users').truncate();
  });

  test('should insert a read_post into db', async () => {
    await PostsService.insert(setup());
    const posts = await db('read_posts');

    expect(posts).toHaveLength(1);
  });
  test('should get filtered posts from db', async () => {
    // Expects only one item in array because read_post was inserted beforehand and uses reddit_id
    await PostsService.insert(setup());
    await MasterPostsService.insert([
      setup({ title: 'let bye', reddit_id: 'b' }),
      setup({ title: '98uvsd nkj3 5412412', reddit_id: 'c' }),
      setup({ title: '98uvsd nkj3 5' }),
    ]);
    await TitlesService.insert({
      user: 'test',
      title: '98uvsd nkj3 5',
    });
    const readPosts = await PostsService.getFilteredPosts('test');
    expect(readPosts).toEqual([
      setup({
        title: '98uvsd nkj3 5412412',
        reddit_id: 'c',
        // date: new Date('2000-01-01'),
        date: '2000-01-01T00:00:00.000Z',
      }),
    ]);
  });
  test('should delete posts older than a date and where read field is true from db', async () => {
    await PostsService.insert(setup());
    await PostsService.del(new Date());
    const posts = await db('read_posts');

    expect(posts).toHaveLength(0);
  });
  test('should get all posts for user from db', async () => {
    await PostsService.insert(setup());
    const testPosts = await PostsService.get('test');

    expect(testPosts).toEqual([
      setup({ id: 1, read: 1, date: Date.parse(new Date('2000-01-01')) }),
    ]);
  });
  test('should delete a post by id', async () => {
    await PostsService.insert(setup());
    await PostsService.delId(1);
    const posts = await db('read_posts');

    expect(posts).toHaveLength(0);
  });
});
