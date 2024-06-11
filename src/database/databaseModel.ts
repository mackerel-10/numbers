import { DataSource, EntityManager } from 'typeorm';
import logger from '../config/logger';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
} from '../config/config';
import User from './User';

class DatabaseModel {
  private static instance: DatabaseModel;
  appDataSource: DataSource;
  entityManger: EntityManager;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.entityManger = appDataSource.manager;
  }

  static async getInstance() {
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
        entities: [User],
      });

      try {
        await appDataSource.initialize();

        logger.debug(`🪷Database Connected: ${appDataSource.isInitialized}`);
      } catch (error) {
        logger.error('Error initializing the database', error);
      }
      DatabaseModel.instance = new DatabaseModel(appDataSource);
    }

    return DatabaseModel.instance;
  }

  async insertUser(inputData: UserInput) {
    try {
      const user = new User();
      user.email = inputData.email;
      user.password = inputData.password;
      user.first_name = inputData.firstName;
      user.last_name = inputData.lastName;

      await this.entityManger.save(user);
      logger.debug('Saved a new user with id: ' + user.id);
    } catch (error) {
      logger.error('Error inserting user', error);
    }
  }

  async isUserExists(email: string) {
    try {
      const appDataSource = DatabaseModel.instance.appDataSource;
      const user = await this.entityManger.exists(User, {
        where: { email },
      });
      logger.debug('Found user: ', JSON.stringify(user));
      return user;
    } catch (error) {
      logger.error('Error finding user', error);
    }
  }
}

export default DatabaseModel;
