import Joi from 'joi';
import express from 'express';
import { validate as validateUUID } from 'uuid';
import { removeFile } from '../utils/removeFile';

// Валидация данных пользователя
const createUserSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  avatar: Joi.string().optional(),
}).with('password', 'repeatPassword');

// Валидация данных пользователя
const updateUserSchema = Joi.object({
  username: Joi.string().min(1),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email(),
  avatar: Joi.string(),
}).with('password', 'repeatPassword');

// Middleware для валидации
export async function createUserValidationMid(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = createUserSchema.validate({ ...req.body, avatar: req.file?.path });
  if (error) {
    // Delete the uploaded file if validation fails
    removeFile(req.file?.path);
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

// Middleware для валидации
export function updateUserValidationMid(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = updateUserSchema.validate({ ...req.body, avatar: req.file?.path });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

// Middleware для валидации
export function validateUUIDMid(req: express.Request, res: express.Response, next: express.NextFunction) {
  const err = validateUUID(req.params.id);
  if (err) {
    return res.status(400).json({ message: 'id must be UUID' });
  }
  next();
}
