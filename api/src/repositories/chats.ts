import { Knex } from 'knex';

export type CreateChatPayload = {
  name?: string;
  isGroup: boolean;
};

export function createChatRepo(knex: Knex) {
  function createChat(payload: CreateChatPayload): Promise<number> {
    return knex('chats').insert(payload).returning('id');
  }

  function getChatById(chatId: number) {
    return knex('chats').where({ id: chatId }).first();
  }

  function getAllChats() {
    return knex('chats').select('*');
  }

  function updateChat(chatId: number, updatedData: Partial<CreateChatPayload>) {
    return knex('chats').where({ id: chatId }).update(updatedData);
  }

  function deleteChat(chatId: number) {
    return knex('chats').where({ id: chatId }).delete();
  }

  return {
    createChat,
    getChatById,
    getAllChats,
    updateChat,
    deleteChat,
  };
}

export type ChatRepo = ReturnType<typeof createChatRepo>;
