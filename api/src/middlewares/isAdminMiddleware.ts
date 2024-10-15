import express from 'express';
import { extractToken } from '../utils';
import { UserRepo } from '../repositories';
import { ForbiddenException } from '../helpers';

export function isAdminMiddleware(repo: UserRepo) {
  return async function isAdminMiddleware(req: express.Request, _res: express.Response, next: express.NextFunction) {
    const token = extractToken(req);
    if (token.error) {
      return next(token.error);
    }

    if (token.payload) {
      const admin = await repo.getUserById(token?.payload.userId);
      if (admin && admin.role !== 'ROLE_ADMIN') {
        return ForbiddenException;
      }
    }

    next();
  };
}
