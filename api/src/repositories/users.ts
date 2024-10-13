import { Knex } from 'knex';

export type CreateUserPayload = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  avatar?: string;
};

export function createUserRepo(knexInstance: Knex) {
  const knex = knexInstance('users');

  function createUser(payload: CreateUserPayload): Promise<string> {
    return knex.insert(payload).returning('id');
  }

  function getUserById(userId: string) {
    return knex.where({ id: userId }).first();
  }

  function getUsers() {
    return knex.select('*');
  }

  function updateUser(userId: string, updatedData: Partial<CreateUserPayload>) {
    return knex.where({ id: userId }).update(updatedData);
  }

  function deleteUser(userId: string) {
    return knex.where({ id: userId }).delete();
  }

  return {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
  };
}

export type UserRepo = ReturnType<typeof createUserRepo>;
