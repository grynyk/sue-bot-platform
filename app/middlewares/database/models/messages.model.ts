import { Message } from 'typegram/message';

export interface DbMessage {
  id: string;
  chat_id: string;
  timestamp: string;
}

export interface BotMessage {
  id: string;
  chatId: string;
  timestamp: string;
}

export interface MessagesDatabaseMiddlewareModel {
  init: () => Promise<void>;
  insert: (message: Message.TextMessage) => Promise<void>;
  deleteAll: () => Promise<void>;
  getAll: () => Promise<BotMessage[]>;
  drop: () => Promise<void>;
  delete: (id: string) => Promise<void>;
}
