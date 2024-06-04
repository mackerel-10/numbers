import { DataSource } from 'typeorm';
import logger from '../config/logger';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
} from '../config/config';

class DatabaseModel {
  private static instance: DatabaseModel;
  appDataSource: DataSource;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
  }

  static async getDbInstance() {
    if (!DatabaseModel.instance) {
      const appDataSource = new DataSource({
        type: DB_TYPE,
        host: DB_HOST,
        port: DB_PORT,
        database: DB_DATABASE,
        username: DB_USER,
        password: DB_PASSWORD,
        synchronize: true,
        logging: false,
        // migrations: [],
        // subscribers: [],
      });

      try {
        await appDataSource.initialize();

        logger.info(`🪷Database Connected: ${appDataSource.isInitialized}`);
      } catch (error) {
        logger.error('Error initializing the database', error);
      }
      DatabaseModel.instance = new DatabaseModel(appDataSource);
    }

    return DatabaseModel.instance;
  }
}

export default DatabaseModel;

/*async function inserter() {
  console.log('Inserting a new user into the database...');
  const user = new User();
  user.firstName = 'Timber';
  user.lastName = 'Saw';
  user.age = 25;
  await AppDataSource.manager.save(user);
  console.log('Saved a new user with id: ' + user.id);

  console.log('Loading users from the database...');
  const users = await AppDataSource.manager.find(User);
  console.log('Loaded users: ', users);

  console.log(
    'Here you can setup and run express / fastify / any other framework.'
  );
}*/
