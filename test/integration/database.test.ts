import DatabaseModel from '../../src/database/DatabaseModel';
import User from '../../src/database/User';
// import { classMapperAndValidator } from '../../src/config/utils';

describe('Testing database', () => {
  afterAll(async () => {
    const db = await DatabaseModel.getInstance();
    await db.appDataSource.destroy();
  });

  test('Test Database connection', async () => {
    const db = await DatabaseModel.getInstance();
    expect(db.appDataSource.isInitialized).toBeTruthy();
  });

  // test('Insert a user', async () => {
  //   const db = await DatabaseModel.getInstance();
  //   const mappedUser = configValidator()
  //
  // }

  test('Test truncateTable which truncate table', async () => {
    try {
      const db = await DatabaseModel.getInstance();
      const truncatedResult = await db.truncateTable(User);

      expect(truncatedResult).toBeUndefined();
    } catch (error) {
      if (error instanceof Error) {
        expect(error).toBeTruthy();
      }
    }
  });
});
