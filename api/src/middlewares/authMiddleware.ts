import express from 'express';
import { extractToken } from '../utils';

export async function verifyToken(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const token = extractToken(req);
  if (token.error) {
    return next(token.error);
  }
  next();
}
