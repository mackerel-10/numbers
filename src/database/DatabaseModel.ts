import { DataSource, EntityManager, EntityTarget } from 'typeorm';
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
import { plainToInstance } from 'class-transformer';

class DatabaseModel {
  private static instance: DatabaseModel;
  appDataSource: DataSource;
  entityManger: EntityManager;

  constructor(appDataSource: DataSource) {
    this.appDataSource = appDataSource;
    this.entityManger = appDataSource.manager;
  }

  static async getInstance() {
    // If the instance is not initialized, create a new instance
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
      this.instance = new DatabaseModel(appDataSource);
    }

    // Return the instance
    return this.instance;
  }

  async insertUser(inputData: UserInput) {
    try {
      const user = plainToInstance(User, inputData);

      await this.entityManger.save(user);
      logger.debug('Saved a new user with id: ' + user.id);
    } catch (error) {
      logger.error('Error inserting user', { stack: error });
    }
  }

  async isUserExists(email: string) {
    try {
      const user = await this.entityManger.exists(User, {
        where: { email },
      });
      logger.debug('Found user: ', JSON.stringify(user));
      return user;
    } catch (error) {
      logger.error('Error finding user', error);
    }
  }

  async truncateTable<Entity>(entity: EntityTarget<Entity>) {
    try {
      await this.entityManger.query('SET FOREIGN_KEY_CHECKS = 0');
      await this.entityManger.clear(entity);
      await this.entityManger.query('SET FOREIGN_KEY_CHECKS = 1');

      logger.debug('Truncated table');
    } catch (error) {
      logger.error('Error truncating table', error);
    }
  }
}

export default DatabaseModel;
