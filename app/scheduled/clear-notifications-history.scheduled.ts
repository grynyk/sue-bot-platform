import 'dotenv/config';
import { MessagesController } from '../controllers';

export function clearNotificationsHistory() {
  (async () => {
    try {
      const BOT_TOKEN: string = process.env.BOT_TOKEN;
      await MessagesController.deleteAll(BOT_TOKEN);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  })();
}

clearNotificationsHistory();
