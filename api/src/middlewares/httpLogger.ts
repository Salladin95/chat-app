import morgan, { StreamOptions } from 'morgan';
import logger from '../utils/logger';

const stream: StreamOptions = {
  write: (message) => logger.info(message),
};

// Build the morgan middleware
export const httpLogger = morgan('combined', { stream: stream });
