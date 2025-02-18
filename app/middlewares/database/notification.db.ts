import * as db from './pool.db';
import { DbDataResult } from '../../models';
import { BotNotification, DbNotification } from './models';
import { v4 as uuidv4 } from 'uuid';
/**
 * This database is for storing scheduled notifications planned to be sent to users
 * in phase of design
 * this is preparation for future GUI
 */
async function createNotificationsTable(): Promise<void> {
  const queryText = `CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        captions JSONB NOT NULL, 
        image_source VARCHAR(1028) DEFAULT NULL, 
        reply_buttons JSONB DEFAULT NULL,
        recurrence_pattern VARCHAR(1028) NOT NULL, 
        time VARCHAR(128) DEFAULT NULL,
        minutes_before_sleep INTEGER DEFAULT NULL, 
        minutes_after_wakeup INTEGER DEFAULT NULL
    );`;
  await db.query(queryText);
}

export const NotificationsDatabaseMiddleware = {
  async init(): Promise<void> {
    try {
      await createNotificationsTable();
    } catch (e: unknown) {
      throw new Error(`Initialization failed: ${e}`);
    }
  },
  async insert(notification: BotNotification): Promise<void> {
    try {
      const id: string = uuidv4();
      const query: string = `
            INSERT INTO notifications(
                id, type, captions, image_source, reply_buttons, 
                recurrence_pattern, minutes_before_sleep, minutes_after_wakeup
            ) 
            VALUES($1, $2, $3::JSONB, $4, $5::JSONB, $6, $7, $8) 
            ON CONFLICT (id) DO NOTHING;
        `;

      await db.query(query, [
        id,
        notification.type,
        JSON.stringify(notification.captions),
        notification.imageSource,
        JSON.stringify(notification.replyButtons),
        `${notification.recurrencePattern}`,
        notification.minutesBeforeSleep,
        notification.minutesAfterWakeup,
      ]);
    } catch (e) {
      throw new Error(`Insert notification failed: ${e}`);
    }
  },
  async delete(id: string): Promise<void> {
    try {
      await db.query('DELETE FROM notifications WHERE id = $1', [id]);
    } catch (e: unknown) {
      throw new Error(`Delete notification failed: ${e}`);
    }
  },
  async getAll(): Promise<BotNotification[]> {
    try {
      const { rows }: DbDataResult<DbNotification[]> = await db.query(
        'SELECT * FROM notifications'
      );
      return rows.map(mapDbNotificationToBotNotification);
    } catch (e: unknown) {
      throw new Error(`Get all notifications failed: ${e}`);
    }
  },
  async getById(id: string): Promise<BotNotification> {
    try {
      const { rows }: DbDataResult<DbNotification[]> = await db.query(
        'SELECT * FROM notifications WHERE id = $1',
        [id]
      );
      return mapDbNotificationToBotNotification(rows[0]);
    } catch (e: unknown) {
      throw new Error(`Get notification by ID failed: ${e}`);
    }
  },
  async drop(): Promise<void> {
    try {
      await db.query('DROP TABLE notifications');
    } catch (e: unknown) {
      throw new Error(`Drop notifications table failed: ${e}`);
    }
  },
};

function mapDbNotificationToBotNotification(
  notification: DbNotification
): BotNotification {
  return {
    id: notification.id,
    type: notification.type,
    captions: notification.captions || null,
    imageSource: notification.image_source || null,
    replyButtons: notification.reply_buttons || null,
    recurrencePattern: notification.recurrence_pattern || null,
    minutesBeforeSleep: notification.minutes_before_sleep || null,
    minutesAfterWakeup: notification.minutes_after_wakeup || null,
  };
}
