import DatabaseModel from '../../src/database/databaseModel';

describe('Check database connection', () => {
  test('Check database connection', async () => {
    const db = await DatabaseModel.getInstance();
    expect(db.appDataSource.isInitialized).toBeTruthy();
    await db.appDataSource.destroy();
  });
});
