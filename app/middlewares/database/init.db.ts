import { MessagesDatabaseMiddleware } from './messages.db';
import { UsersDatabaseMiddleware } from './users.db';

export async function StoragesInit(): Promise<void> {
  try {
    await UsersDatabaseMiddleware.init();
    await MessagesDatabaseMiddleware.init();
  } catch (e: unknown) {
    throw new Error(`${e}`);
  }
}
