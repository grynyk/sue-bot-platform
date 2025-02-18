import { MessagesDatabaseMiddleware } from '../messages.db';
import * as db from '../pool.db';
import { Message } from 'telegraf/typings/core/types/typegram';

jest.mock('../pool.db');

describe('MessagesDatabaseMiddleware', () => {
  const mockMessage: Message.TextMessage = {
    message_id: 1,
    from: {
      id: 1,
      is_bot: false,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      language_code: 'en',
    },
    chat: {
      id: 1,
      type: 'private',
    },
    date: Math.floor(Date.now() / 1000),
    text: 'Hello, world!',
  } as unknown as Message.TextMessage;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create messages table', async () => {
    await MessagesDatabaseMiddleware.init();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS'));
  });

  it('should insert a new message', async () => {
    await MessagesDatabaseMiddleware.insert(mockMessage);
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO messages'), expect.any(Array));
  });

  it('should delete a message by id', async () => {
    await MessagesDatabaseMiddleware.delete('1');
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM messages WHERE id'), ['1']);
  });

  it('should delete all messages', async () => {
    await MessagesDatabaseMiddleware.deleteAll();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM messages'));
  });

  it('should drop messages table', async () => {
    await MessagesDatabaseMiddleware.drop();
    expect(db.query).toHaveBeenCalledWith(expect.stringContaining('DROP TABLE messages'));
  });
});
