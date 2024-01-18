import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const AppDataSource = new DataSource({
  type: 'mysql',
  port: 3306,
  host: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_DB_HOST : 'localhost',
  username: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_DB_USERNAME : process.env.LOCAL_DB_USERNAME,
  password: process.env.NODE_ENV === 'production' ? process.env.DEPLOY_DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [__dirname + '/../models/*.{js,ts}'],
  subscribers: [],
  migrations: [],
  namingStrategy: new SnakeNamingStrategy()
});

export default AppDataSource;
