import express from 'express';
import jwt from 'jsonwebtoken';
import { AccessDeniedException, appConf, ErrorHandler } from '../helpers';

export function extractToken(req: express.Request): { error: ErrorHandler | null; payload: jwt.JwtPayload | null } {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return { error: AccessDeniedException, payload: null };
  }

  try {
    const payload = jwt.verify(token, appConf.jwtSecret) as jwt.JwtPayload;
    return { payload, error: null };
  } catch (error) {
    return { payload: null, error: AccessDeniedException };
  }
}
