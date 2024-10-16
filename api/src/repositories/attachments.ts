import { Knex } from 'knex';
import { CreateAttachmentPayload } from '../types';

export function createAttachmentRepo(knex: Knex) {
  function createAttachment(payload: CreateAttachmentPayload): Promise<number> {
    return knex('attachments').insert(payload).returning('id');
  }

  function getAttachmentsByMessageId(messageId: number) {
    return knex('attachments').where({ messageId }).select('*');
  }

  function deleteAttachment(attachmentId: number) {
    return knex('attachments').where({ id: attachmentId }).delete();
  }

  return {
    createAttachment,
    getAttachmentsByMessageId,
    deleteAttachment,
  };
}

export type AttachmentRepo = ReturnType<typeof createAttachmentRepo>;
