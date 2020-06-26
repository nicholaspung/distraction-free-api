const db = require('../../data/config');

const PostsService = require('../posts.service');
const RedditService = require('../reddit.service');
const MasterPostsService = require('../masterPosts.service');
const TitlesService = require('../titles.service');
const UsersService = require('../users.service');

const setup = (overrides = {}) => ({
  reddit_id: 1,
  user: 'test',
  read: true,
  date: new Date('2000-01-01'),
  ...overrides,
});

beforeEach(async () => {
  await db('read_posts').truncate();
  await db('titles').truncate();
  await db('master_posts').truncate();
  await db('users').truncate();
});

describe('#read_posts model', () => {
  test('should insert a read_post into db', async () => {
    await PostsService.insert(setup());
    const posts = await db('read_posts');

    expect(posts).toHaveLength(1);
  });
  test('should get filtered posts from db', async () => {
    await PostsService.insert(setup());
    await MasterPostsService.insert([
      setup({ title: 'let bye' }),
      setup({ title: 'bye until' }),
      setup({ title: 'let hi' }),
    ]);
    await TitlesService.insert({ user: 'test', title: 'hi' });
    const readPosts = await PostsService.getFilteredPosts('test');
    expect(readPosts).toEqual([setup({ title: 'let hi' })]);
  });
  test('should delete posts older than a date and where read field is true from db', async () => {
    await PostsService.insert(setup());
    await PostsService.del({ user: 'test', date: new Date() });
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
