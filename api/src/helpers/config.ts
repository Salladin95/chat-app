export type SqlConfig = {
  host: string;
  rootPassword: string;
  db: string;
  user: string;
  userPassword: string;
};

export const mySqlConfig = {
  host: process.env.HOST,
  rootPassword: process.env.MYSQL_ROOT_PASSWORD,
  db: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  userPassword: process.env.MYSQL_PASSWORD,
};
