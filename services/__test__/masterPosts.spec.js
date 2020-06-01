const db = require('../../data/config');

const MasterPostsService = require('../masterPosts.service');

beforeEach(async () => {
  await db('master_posts').truncate();
});

describe('masterPosts model', () => {
  it('should insert master posts into db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(1);
  });
  it('should get all master posts from db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    const testMasterPosts = await MasterPostsService.get();
    const masterPosts = await db('master_posts');

    expect(testMasterPosts).toEqual(masterPosts);
  });
  it('should delete master posts via id from db', async () => {
    await MasterPostsService.insert([{ id: 1 }]);
    await MasterPostsService.delPost(1);
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(0);
  });
  it('should delete all master posts older than date from db', async () => {
    await MasterPostsService.insert([{ id: 1, date: new Date(1) }]);
    await MasterPostsService.insert([{ id: 2, date: new Date(2) }]);
    await MasterPostsService.insert([{ id: 3, date: new Date() }]);
    await MasterPostsService.del(new Date());
    const masterPosts = await db('master_posts');

    expect(masterPosts).toHaveLength(1);
  });
  it('should get master posts from last queried from db', async () => {
    await MasterPostsService.insert([{ id: 1, date: new Date(1) }]);
    await MasterPostsService.insert([{ id: 2, date: new Date(2) }]);
    await MasterPostsService.insert([{ id: 3, date: new Date('2000-01-01') }]);
    const testMasterPosts = await MasterPostsService.del(new Date());
    const masterPosts = await db('master_posts');

    expect(masterPosts).toEqual(testMasterPosts);
  });
});
