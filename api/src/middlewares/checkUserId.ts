import express from 'express';
import { extractToken } from '../utils';
import { ForbiddenException } from '../helpers';

export function checkUserId(req: express.Request, _: express.Response, next: express.NextFunction) {
  const token = extractToken(req);

  if (token.error) {
    return next(token.error);
  }

  if (req.params.userId && +req.params.userId !== +token.payload?.userId) {
    return next(ForbiddenException);
  }

  next();
}
