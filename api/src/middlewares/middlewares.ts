import Joi from 'joi';
import express from 'express';
import { validate as validateUUID } from 'uuid';
import { BadRequestException } from '../helpers';

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export function signInValidationMid(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const { error } = signInSchema.validate(req.body);

  if (error) {
    return next(BadRequestException(error.details[0].message));
  }

  next();
}

export function validateUUIDMid(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const error = validateUUID(req.params.id);
  if (error) {
    return next(BadRequestException('id must be UUID'));
  }
  next();
}
