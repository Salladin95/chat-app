import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';

import { connectToDb } from './utils';
import { handleError } from './helpers';
import { httpLogger } from './middlewares';
import { router, setupRouter } from './routes/router';

dotenv.config({ path: path.join(__dirname, '../.env') });

const app: express.Application = express();

const uri = process.env.DB_URL;
if (uri) {
  const db = connectToDb(uri);
  setupRouter(db);
} else {
  console.error('process.env.DB_URL IS MISSING');
  process.exit(1);
}

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// Теперь любой файл, загруженный в директорию uploads, будет доступен по URL, например, http://localhost:3000/uploads/pics/filename.jpg
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
