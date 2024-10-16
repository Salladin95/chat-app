import { Knex } from 'knex';
import { AttachmentRepo } from './attachments';
import { CreateAttachmentPayload } from '../types';

export type CreateMessagePayload = {
  senderId: number;
  chatId: number;
  content: string;
  imageUrl?: string;
};

export function createMessageRepo(knex: Knex, attachmentRepo: AttachmentRepo) {
  async function createMessage(payload: CreateMessagePayload, attachments: CreateAttachmentPayload[]): Promise<number> {
    const messageId = await knex('messages')
      .insert(payload)
      .returning('id')
      .then((ids) => ids[0]);

    // Insert attachments if provided
    if (attachments.length) {
      await Promise.all(attachments.map((att) => attachmentRepo.createAttachment({ ...att, messageId })));
    }

    return messageId;
  }

  async function getMessageById(messageId: number) {
    const message = await knex('messages').where({ id: messageId }).first();
    if (message) {
      const attachments = await attachmentRepo.getAttachmentsByMessageId(messageId);
      message.attachments = attachments;
    }
    return message;
  }

  function getMessagesByChatId(chatId: number) {
    return knex('messages').where({ chatId }).select('*');
  }

  function updateMessage(messageId: number, updatedData: Partial<CreateMessagePayload>) {
    return knex('messages').where({ id: messageId }).update(updatedData);
  }

  function deleteMessage(messageId: number) {
    return knex('messages').where({ id: messageId }).delete();
  }

  return {
    createMessage,
    getMessageById,
    getMessagesByChatId,
    updateMessage,
    deleteMessage,
  };
}
