import { Knex } from 'knex';

export type AddParticipantPayload = {
  chatId: number;
  userId: number;
};

export function createChatParticipantRepo(knex: Knex) {
  function addParticipant(payload: AddParticipantPayload): Promise<void> {
    return knex('chat_participants').insert(payload);
  }

  function removeParticipant(chatId: number, userId: number) {
    return knex('chat_participants').where({ chatId, userId }).delete();
  }

  function getParticipantsByChatId(chatId: number) {
    return knex('chat_participants').where({ chatId }).select('*');
  }

  return {
    addParticipant,
    removeParticipant,
    getParticipantsByChatId,
  };
}

export type ChatParticipantRepo = ReturnType<typeof createChatParticipantRepo>;
