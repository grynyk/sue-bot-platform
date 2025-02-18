import { BroadcastController } from '../controllers';
import 'dotenv/config';
import moment from 'moment';

export function broadcastScheduledNotification() {
  (async () => {
    try {
      const BOT_TOKEN: string = process.env.BOT_TOKEN;
      await BroadcastController.sendScheduledNotificationToAllUsers(
        moment(moment().format('YYYY-MM-DDTHH:mm').valueOf()),
        BOT_TOKEN
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  })();
}

broadcastScheduledNotification();
