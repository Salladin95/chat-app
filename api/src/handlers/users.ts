import path from 'path';
import express from 'express';
import { promises as fs } from 'fs';
import { UserRepo } from '../repositories';
import { removeFile } from '../utils/removeFile';

// Handlers
export function createUserHandlers(repo: UserRepo) {
  async function signUp(request: express.Request, res: express.Response) {
    try {
      const { repeatPassword: _repeatPassword, ...dto } = request.body;
      const result = await repo.createUser({ ...dto, avatar: request.file?.path || null });

      res.status(201).json({ result });
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Delete the uploaded file if validation fails
      removeFile(request.file?.path);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function updateUser(request: express.Request, res: express.Response) {
    try {
      const id = request.params.id;

      // Получаем данные пользователя перед обновлением
      const user = await repo.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const dto = { ...request.body };

      // Если новый аватар передан, проверяем, есть ли старый аватар
      if (request.file) {
        dto.avatar = request.file.path;

        if (user.avatar) {
          try {
            // Удаляем старый аватар, если он существует
            const oldAvatarPath = path.resolve(user.avatar);
            await fs.access(oldAvatarPath); // Проверяем, существует ли файл
            await fs.unlink(oldAvatarPath); // Удаляем файл
            console.log(`Old avatar deleted: ${oldAvatarPath}`);
          } catch (err) {
            console.error(`Failed to delete old avatar: ${err.message}`);
          }
        }
      }

      // Обновляем данные пользователя
      const result = await repo.updateUser(id, dto);
      res.status(200).json({ result });
    } catch (error) {
      console.error('Error during updating user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function getUser(request: express.Request, res: express.Response) {
    const id = request.params.id;
    try {
      const user = await repo.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function getUsers(_request: express.Request, res: express.Response) {
    try {
      const users = await repo.getUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async function deleteUser(request: express.Request, res: express.Response) {
    const id = request.params.id;
    try {
      const user = await repo.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.avatar) {
        try {
          // Удаляем старый аватар, если он существует
          const oldAvatarPath = path.resolve(user.avatar);
          await fs.access(oldAvatarPath); // Проверяем, существует ли файл
          await fs.unlink(oldAvatarPath); // Удаляем файл
          console.log(`Old avatar deleted: ${oldAvatarPath}`);
        } catch (err) {
          console.error(`Failed to delete old avatar: ${err.message}`);
        }
      }

      await repo.deleteUser(id);

      res.status(204).json({ message: 'User has been deleted' });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  return {
    signUp,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
  };
}
