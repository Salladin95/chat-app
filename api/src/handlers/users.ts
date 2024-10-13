import express from 'express';
import { UserRepo } from '../repositories';

// Handlers
export function createUserHandlers(repo: UserRepo) {
  async function signUp(request: express.Request, res: express.Response) {
    try {
      const dto = { ...request.body, avatar: request.file?.path || null };
      const result = await repo.createUser(dto);

      res.status(201).json({ result });
    } catch (error) {
      console.error('Error during signup:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // TODO: REMOVE OLD AVATAR ???
  async function updateUser(request: express.Request, res: express.Response) {
    try {
      const id = request.params.id;
      const dto = { ...request.body, avatar: request.file?.path || null };
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

  async function deleteUser(request: express.Request, res: express.Response) {
    const id = request.params.id;
    try {
      const user = await repo.deleteUser(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error deleting user:', error.message);
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

  return {
    signUp,
    getUser,
    getUsers,
    deleteUser,
    updateUser,
  };
}
