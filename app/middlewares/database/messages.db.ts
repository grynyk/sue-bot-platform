import { Message } from 'telegraf/typings/core/types/typegram';
import {
  BotMessage,
  DbMessage,
  MessagesDatabaseMiddlewareModel,
} from './models';
import * as db from './pool.db';
import { DbDataResult } from '../../models';
import moment from 'moment';
/**
 * This database is for storing messages sent by bot to users
 * to make scheduled every night clean-ups of messages in client's chat history
 */
async function createMessagesTable(): Promise<void> {
  const queryText = `CREATE TABLE IF NOT EXISTS
        messages(
              id VARCHAR(128) PRIMARY KEY,
              chat_id VARCHAR(128),
              timestamp TIMESTAMP
        )`;
  await db.query(queryText);
}

export const MessagesDatabaseMiddleware: MessagesDatabaseMiddlewareModel = {
  async init(): Promise<void> {
    try {
      await createMessagesTable();
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },

  async insert(message: Message.TextMessage): Promise<void> {
    try {
      await MessagesDatabaseMiddleware.init(); // in case of table was dropped
      const query: string = `INSERT INTO messages(id, chat_id, timestamp) VALUES($1, $2, $3) ON CONFLICT DO NOTHING`;
      await db.query(query, [
        message.message_id,
        message.chat.id,
        moment().format(),
      ]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await db.query('DELETE FROM messages WHERE id = $1', [id]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async deleteAll(): Promise<void> {
    try {
      await db.query('DELETE FROM messages');
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAll(): Promise<BotMessage[]> {
    try {
      const { rows }: DbDataResult<DbMessage[]> = await db.query(
        'SELECT * FROM messages'
      );
      return rows.map(mapDbMessageToBotMessage);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async drop(): Promise<void> {
    try {
      await db.query('DROP TABLE messages');
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};

function mapDbMessageToBotMessage(message: DbMessage): BotMessage {
  return {
    id: message.id,
    chatId: message.chat_id,
    timestamp: message.timestamp,
  };
}
