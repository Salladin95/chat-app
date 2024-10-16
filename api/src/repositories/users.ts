import { Knex } from 'knex';

export type CreateUserPayload = {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  avatar?: string;
};

export function createUserRepo(knex: Knex) {
  function createUser(payload: CreateUserPayload): Promise<string> {
    return knex('users').insert(payload).returning('id');
  }

  function getUserById(userId: string) {
    return knex('users').where({ id: userId }).first();
  }

  function getUserByEmail(email: string) {
    return knex('users').where({ email }).first();
  }

  function getUsers() {
    return knex('users').select('*');
  }

  function updateUser(userId: string, updatedData: Partial<CreateUserPayload>) {
    return knex('users').where({ id: userId }).update(updatedData);
  }

  function deleteUser(userId: string) {
    return knex('users').where({ id: userId }).delete();
  }

  return {
    createUser,
    getUserById,
    getUserByEmail,
    getUsers,
    updateUser,
    deleteUser,
  };
}

export type UserRepo = ReturnType<typeof createUserRepo>;
