import DatabaseModel from '../../src/database/DatabaseModel';
import User from '../../src/database/User';
import { configValidator } from '../../src/config/utils';

describe('Check database connection', () => {
  test('Check database connection', async () => {
    const db = await DatabaseModel.getInstance();
    expect(db.appDataSource.isInitialized).toBeTruthy();
    await db.appDataSource.destroy();
  });

  // test('Insert a user', async () => {
  //   const db = await DatabaseModel.getInstance();
  //   const mappedUser = configValidator()
  //
  // }

  test('Truncate the table', async () => {
    const db = await DatabaseModel.getInstance();

    await expect(db.truncateTable(User)).resolves.toBeUndefined();
  });
});
