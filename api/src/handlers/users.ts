import path from 'path';
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';

import { UserRepo } from '../repositories';
import { removeFile } from '../utils/removeFile';
import { AccessDeniedException, appConf, ErrorHandler, InternalFailureException } from '../helpers';

const UserNotFoundException = new ErrorHandler(404, 'User not found');

// Handlers
export function createUserHandlers(repo: UserRepo) {
  async function signUp(request: express.Request, res: express.Response) {
    try {
      const { repeatPassword: _repeatPassword, ...dto } = request.body;
      const user = await repo.getUserByEmail(dto.email);
      if (user) return res.status(400).json({ message: `User with email - ${dto.email} already exists` });
      dto.password = await bcrypt.hash(dto.password, 10);
      const [id] = await repo.createUser({ ...dto, avatar: request.file?.path || null });

      res.status(201).json({ id });
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Delete the uploaded file if validation fails
      removeFile(request.file?.path);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function signIn(request: express.Request, res: express.Response) {
    try {
      const user = await repo.getUserByEmail(request.body.email);
      if (!user) return res.status(401).json({ error: 'Authentication failed' });

      const passwordMatch = await bcrypt.compare(request.body.password, user.password);
      if (!passwordMatch) {
        return AccessDeniedException;
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, appConf.jwtSecret, {
        expiresIn: '32h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during sign in:', error.message);
      return InternalFailureException;
    }
  }

  async function updateUser(request: express.Request, res: express.Response) {
    try {
      const id = request.params.userId;

      // Получаем данные пользователя перед обновлением
      const user = await repo.getUserById(id);
      if (!user) {
        return UserNotFoundException;
      }

      const dto = { ...request.body };

      if (dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      }

      // Если новый аватар передан, проверяем, есть ли старый аватар
      if (request.file) {
        dto.avatar = request.file.path;

        if (user.avatar) {
          const oldAvatarPath = path.resolve(user.avatar);
          removeFile(oldAvatarPath);
        }
      }

      // Обновляем данные пользователя
      const result = await repo.updateUser(id, dto);
      res.status(200).json({ id: result });
    } catch (error) {
      console.error('Error during updating user:', error.message);
      return InternalFailureException;
    }
  }

  async function getUser(request: express.Request, res: express.Response) {
    const id = request.params.userId;
    try {
      const user = await repo.getUserById(id);
      if (!user) {
        return UserNotFoundException;
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error.message);
      return InternalFailureException;
    }
  }

  async function getUsers(_request: express.Request, res: express.Response) {
    try {
      const users = await repo.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return InternalFailureException;
    }
  }

  async function deleteUser(request: express.Request, res: express.Response) {
    const id = request.params.userId;
    try {
      const user = await repo.getUserById(id);
      if (!user) {
        return UserNotFoundException;
      }

      if (user.avatar) {
        const oldAvatarPath = path.resolve(user.avatar);
        removeFile(oldAvatarPath);
      }

      await repo.deleteUser(id);

      res.status(204).json({ message: 'User has been deleted' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return InternalFailureException;
    }
  }

  return {
    signUp,
    signIn,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
  };
}
