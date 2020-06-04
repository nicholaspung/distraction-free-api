const db = require('../../data/config');

const MasterPostsService = require('../masterPosts.service');
const PostsService = require('../posts.service');
const TitlesService = require('../titles.service');
const UsersService = require('../users.service');

const setup = (overrides = {}) => ({
  title: 'hi',
  comments: 'http://url',
  url: 'http://urls',
  reddit_id: 1,
  user: 'test',
  read: false,
  created_at: new Date('2000-01-01'),
  search_title: 'hi',
  ...overrides,
});

beforeEach(async () => {
  await db('posts').truncate();
  await db('titles').truncate();
  await db('master_posts').truncate();
  await db('users').truncate();
});

describe('posts model', () => {
  test('should insert a post into db', async () => {
    await PostsService.insert(setup());
    const posts = await db('posts');

    expect(posts).toHaveLength(1);
  });
  test('should get posts for user where read is false from db', async () => {
    await PostsService.insert(setup());
    const testPosts = await PostsService.get('test');

    expect(testPosts).toEqual([
      setup({ read: 0, id: 1, created_at: Date.parse(new Date('2000-01-01')) }),
    ]);
  });
  test('should find titles in master posts, insert into titles table, update user last_queried, and return the filtered posts', async () => {
    await MasterPostsService.insert([
      setup({ title: 'let bye' }),
      setup({ title: 'bye until' }),
      setup({ title: 'let hi' }),
    ]);
    await TitlesService.insert({ user: 'test', title: 'hi' });
    const testPosts = await PostsService.getFilteredPosts('test');

    expect(testPosts).toHaveLength(1);
  });
  test(`should update a post's read field in db`, async () => {
    const post = setup();
    await UsersService.insert('test');
    await PostsService.insert(post);
    await PostsService.update({ user: 'test', reddit_id: 1, read: true });
    await UsersService.updateLastQueried('test', new Date('2000-01-01'));
    const posts = await db('posts');
    const users = await db('users');

    expect(posts).toEqual([
      {
        id: 1,
        title: 'hi',
        comments: 'http://url',
        url: 'http://urls',
        reddit_id: 1,
        user: 'test',
        read: true + 0,
        created_at: Date.parse(new Date('2000-01-01')),
        search_title: 'hi',
      },
    ]);
    expect(users).toEqual([
      { id: 1, user: 'test', last_queried: Date.parse(new Date('2000-01-01')) },
    ]);
  });
  test('should delete posts older than a date and where read field is true from db', async () => {
    await PostsService.insert(setup({ read: true }));
    await PostsService.del(new Date());
    const posts = await db('posts');

    expect(posts).toHaveLength(0);
  });
  test('should delete title and posts associated with title from db', async () => {
    await PostsService.insert(setup());
    await PostsService.insert(setup({ search_title: 'bye', reddit_id: 2 }));
    await TitlesService.insert({ user: 'test', title: 'hi' });
    await PostsService.delTitleAndPosts({ user: 'test', title: 'hi' });
    const posts = await db('posts');
    const titles = await db('titles');

    expect(posts).toHaveLength(1);
    expect(titles).toHaveLength(0);
  });
  test('should delete a post by id', async () => {
    await PostsService.insert(setup());
    await PostsService.delId(1);
    const posts = await db('posts');

    expect(posts).toHaveLength(0);
  });
});
