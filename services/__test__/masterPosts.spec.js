const db = require('../../data/config');

const MasterPostsService = require('../masterPosts.service');

describe('masterPosts model', () => {
  beforeEach(async () => {
    await db('master_posts').truncate();
  });

  test('should insert master posts into db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(1);
  });
  test('should get all master posts from db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    const testMasterPosts = await MasterPostsService.get();
    const masterPosts = await db('master_posts');

    expect(testMasterPosts).toEqual(masterPosts);
  });
  test('should delete master posts via id from db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    await MasterPostsService.delPost(1);
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(0);
  });
  test('should delete all master posts older than date from db', async () => {
    await MasterPostsService.insert([{ id: 1 }], new Date(1));
    await MasterPostsService.insert([{ id: 2 }], new Date(2));
    await MasterPostsService.insert([{ id: 3 }], new Date());
    await MasterPostsService.del(new Date('2000-01-01'));
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(1);
  });
  test('should get master posts from last queried from db', async () => {
    await MasterPostsService.insert([{ id: 1 }], new Date(1));
    await MasterPostsService.insert([{ id: 2 }], new Date(2));
    await MasterPostsService.insert([{ id: 3 }], new Date('2000-01-01'));
    const testMasterPosts = await MasterPostsService.getFromLastQueried(new Date('2001-01-01'));

    expect(testMasterPosts).toEqual([]);
  });
});
