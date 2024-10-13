import Joi from 'joi';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import router from './routes';
import { handleError } from './helpers';
import { httpLogger } from './middlewares';
import { ConnectionOptions, connectToDb } from './utils';

dotenv.config({ path: path.join(__dirname, '../.env') });

export const mySqlConfigSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  DB_PORT: Joi.string().required(),
});

const { error: mySqlConfigErr } = mySqlConfigSchema.validate(process.env);
if (!mySqlConfigErr) {
  console.error('ENV validation failed:', mySqlConfigErr);
  process.exit(1);
}
const dbConnectionOpts = {
  host: process.env.DB_HOST,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  port: Number(process.env.DB_PORT) || 3306,
} as ConnectionOptions;

const app: express.Application = express();

connectToDb(dbConnectionOpts);

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// Теперь любой файл, загруженный в директорию uploads, будет доступен по URL, например, http://localhost:3000/uploads/avatars/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// error handler
const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
