import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '/.env') });

export const appConf = {
  port: process.env.PORT,
  host: process.env.HOST,
  rootPassword: process.env.MYSQL_ROOT_PASSWORD,
  db: process.env.MYSQL_DATABASE,
  dbURI: process.env.DB_URL,
  user: process.env.MYSQL_USER,
  userPassword: process.env.MYSQL_PASSWORD,
  jwtSecret: process.env.JWT_SECRET || 'BIG_BIG_BIG_SECRET',
};
