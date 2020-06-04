const db = require('../../data/config');

const TitlesService = require('../titles.service');

const setup = (overrides = {}) => ({
  user: 'test',
  title: 'hello',
  ...overrides,
});

beforeEach(async () => {
  await db('titles').truncate();
});

describe('titles model', () => {
  test('should insert title into db', async () => {
    await TitlesService.insert(setup());
    const titles = await db('titles');

    expect(titles).toHaveLength(1);
  });
  test('should get titles according to user from db', async () => {
    await TitlesService.insert(setup());
    await TitlesService.insert(setup({ user: 'table' }));
    const testTitles = await TitlesService.get('test');

    expect(testTitles).toHaveLength(1);
  });
  test('should update title in db', async () => {
    await TitlesService.insert(setup());
    await TitlesService.update({ user: 'test', id: 1, title: 'hi' });
    const titles = await db('titles');

    expect(titles).toEqual([{ id: 1, user: 'test', title: 'hi' }]);
  });
  test('should delete title from db', async () => {
    await TitlesService.insert(setup());
    await TitlesService.del({ user: 'test', title: 'hello' });
    const titles = await db('titles');

    expect(titles).toHaveLength(0);
  });
});
