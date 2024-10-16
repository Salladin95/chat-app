import Joi from 'joi';
import express from 'express';
import { removeFile } from '../utils/removeFile';
import { BadRequestException } from '../helpers';

const createUserSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  avatar: Joi.string().optional(),
}).with('password', 'repeatPassword');

export async function createUserValidationMid(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
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
