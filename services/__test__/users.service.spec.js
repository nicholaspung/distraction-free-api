const db = require('../../data/config');

const UsersService = require('../users.service');

const setup = (overrides = {}) => ({
  user: 'test',
  ...overrides,
});

beforeEach(async () => {
  await db('users').truncate();
});

describe('#users model', () => {
  test('should insert user into db', async () => {
    await UsersService.insert(setup().user);
    const users = await db('users');

    expect(users).toHaveLength(1);
  });
  test('should get user from db', async () => {
    await UsersService.insert(setup().user);
    const testUsers = await UsersService.get(setup().user);

    expect(testUsers).toHaveLength(1);
  });
  test('should update last_queried for user in db', async () => {
    const testDate = new Date('2000-01-01');
    await UsersService.insert(setup().user);
    await UsersService.updateLastQueried(setup().user, testDate);
    const testUsers = await db('users');

    expect(testUsers).toEqual([
      setup({ last_queried: Date.parse(testDate), id: 1 }),
    ]);
  });
  test('should delete user from db', async () => {
    await UsersService.insert(setup().user);
    await UsersService.del(setup().user);
    const users = await db('users');

    expect(users).toHaveLength(0);
  });
});
