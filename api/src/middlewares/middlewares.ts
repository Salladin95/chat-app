import Joi from 'joi';
import express from 'express';
import { validate as validateUUID } from 'uuid';
import { BadRequestException } from '../helpers';
import { removeFile } from '../utils/removeFile';

const createUserSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  avatar: Joi.string().optional(),
}).with('password', 'repeatPassword');

export async function createUserValidationMid(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const { error } = createUserSchema.validate({ ...req.body, avatar: req.file?.path });
  if (error) {
    // Delete the uploaded file if validation fails
    removeFile(req.file?.path);
    return next(BadRequestException(error.details[0].message));
  }

  next();
}

const updateUserSchema = Joi.object({
  username: Joi.string().min(1),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email(),
  avatar: Joi.string(),
}).with('password', 'repeatPassword');

export function updateUserValidationMid(req: express.Request, _res: express.Response, next: express.NextFunction) {
  const { error } = updateUserSchema.validate({ ...req.body, avatar: req.file?.path });

  if (error) {
    return next(BadRequestException(error.details[0].message));
  }

  next();
}

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
