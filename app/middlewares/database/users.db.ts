import { DbDataResult } from '../../models';
import * as db from './pool.db';
import {
  BotUser,
  DbUser,
  UsersDatabaseMiddlewareModel,
} from './models/users.model';
import { User as TgUser } from 'telegraf/typings/core/types/typegram';
import moment, { Moment } from 'moment';
/**
 * This database is for storing users participating in bot
 * to sent notifications to them, gathering stats etc
 */
const createUserTable = async (): Promise<void> => {
  const queryText: string = `CREATE TABLE IF NOT EXISTS
        users(
              id VARCHAR(128) PRIMARY KEY,
              first_name VARCHAR(128),
              last_name VARCHAR(128),
              username VARCHAR(128),
              skin_type VARCHAR(128),
              timestamp TIMESTAMP,
              notifications_enabled BOOLEAN,
              done_tasks_counter INTEGER,
              wake_up_time VARCHAR(128),
              bed_time VARCHAR(128),
              was_active_today BOOLEAN
        )`;
  await db.query(queryText);
};

export const UsersDatabaseMiddleware: UsersDatabaseMiddlewareModel = {
  async init(): Promise<void> {
    try {
      await createUserTable();
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async createOne(user: TgUser): Promise<void> {
    try {
      const query = `INSERT INTO
      users(id, first_name, last_name, username, skin_type, timestamp, notifications_enabled, wake_up_time, bed_time, done_tasks_counter, was_active_today)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT DO NOTHING`;
      const values = [
        String(user.id),
        user?.first_name || null,
        user?.last_name || null,
        user.username || null,
        null,
        moment().format(),
        true,
        '07:00',
        '22:10',
        0,
        true,
      ];
      await db.query(query, values);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async updateBasicInfo(user: TgUser): Promise<void> {
    try {
      const currentUser: BotUser = await this.getById(user.id);
      if (!currentUser) {
        return;
      }
      const updateSchemeValues = [
        {
          columnName: 'first_name',
          currentValue: currentUser.firstName,
          newValue: user.first_name || null,
        },
        {
          columnName: 'last_name',
          currentValue: currentUser.lastName,
          newValue: user.last_name || null,
        },
        {
          columnName: 'username',
          currentValue: currentUser.username,
          newValue: user.username || null,
        },
        {
          columnName: 'was_active_today',
          currentValue: currentUser.wasActiveToday || false,
          newValue: true,
        },
      ];
      for (const { columnName, currentValue, newValue } of updateSchemeValues) {
        if (currentValue === newValue) {
          continue;
        }
        await db.query(`UPDATE users SET ${columnName} = $1 WHERE id = $2`, [
          newValue,
          user.id,
        ]);
      }
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async incrementDoneTasksCounterByUserId(id: string): Promise<void> {
    try {
      const currentUser: DbUser = await this.getById(id);
      if (!currentUser) {
        return;
      }
      await db.query(
        'UPDATE users SET done_tasks_counter = done_tasks_counter + 1 WHERE id = $1',
        [id]
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async resetDoneTasksCounterToAllUsers(): Promise<void> {
    try {
      await db.query('UPDATE users SET done_tasks_counter = $1', [0]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async resetWasActiveTodayFlagToAllUsers(): Promise<void> {
    try {
      await db.query('UPDATE users SET was_active_today = $1', [false]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async updateNotificationsFlagByUserId(
    flag: boolean,
    id: string
  ): Promise<void> {
    try {
      const currentUser: DbUser = await this.getById(id);
      if (!currentUser) {
        return;
      }
      await db.query(
        'UPDATE users SET notifications_enabled = $1 WHERE id = $2',
        [flag, id]
      );
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async updateSkinTypeByUserId(skinType: string, id: string): Promise<void> {
    try {
      const currentUser: DbUser = await this.getById(id);
      if (!currentUser) {
        return;
      }
      await db.query('UPDATE users SET skin_type = $1 WHERE id = $2', [
        skinType,
        id,
      ]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async updateNotificationsWakeUpTimeByUserId(
    time: string,
    id: string
  ): Promise<void> {
    try {
      const currentUser: DbUser = await this.getById(id);
      if (!currentUser) {
        return;
      }
      await db.query('UPDATE users SET wake_up_time = $1 WHERE id = $2', [
        time,
        id,
      ]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async updateNotificationsBedTimeByUserId(
    time: string,
    id: string
  ): Promise<void> {
    try {
      const currentUser: DbUser = await this.getById(id);
      if (!currentUser) {
        return;
      }
      await db.query('UPDATE users SET bed_time = $1 WHERE id = $2', [
        time,
        id,
      ]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getById(id: string): Promise<BotUser> {
    try {
      const { rows, rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [String(id)]
      );
      return rowCount > 0 ? mapDbUserToBotUser(rows[0]) : null;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async deleteById(id: string): Promise<void> {
    try {
      await db.query('DELETE FROM users WHERE id = $1', [String(id)]);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAll(): Promise<BotUser[]> {
    try {
      const { rows }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users'
      );
      return rows.map(mapDbUserToBotUser);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getTotalNumber(): Promise<number> {
    try {
      const { rows }: DbDataResult<{ count: number }[]> = await db.query(
        'SELECT COUNT(*) FROM users'
      );
      return rows[0].count;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAllActiveToday(): Promise<number> {
    try {
      const { rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE was_active_today = $1',
        [true]
      );
      return rowCount;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAllDoneTasksToday(): Promise<number> {
    try {
      const { rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * from users where done_tasks_counter > $1',
        [0]
      );
      return rowCount;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAllWithDisabledNotifications(): Promise<number> {
    try {
      const { rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE notifications_enabled = $1',
        [false]
      );
      return rowCount;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAllWhoCompletedSkinTest(): Promise<number> {
    try {
      const { rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE skin_type IS NOT NULL'
      );
      return rowCount;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getAllWithChangedNotificationsTime(): Promise<number> {
    try {
      const { rowCount }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE wake_up_time != $1 OR bed_time != $2',
        ['07:00', '22:10']
      );
      return rowCount;
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getRecentRegistered(): Promise<BotUser[]> {
    try {
      const startDate: Moment = moment().subtract(1, 'days');
      const endDate: Moment = moment();
      const { rows }: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE timestamp BETWEEN $1 AND $2',
        [startDate, endDate]
      );
      return rows.map(mapDbUserToBotUser);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async getRecentRegisteredDiff(): Promise<number> {
    try {
      const startDate = moment().clone().subtract(10, 'years');
      const endDate = moment().clone().subtract(1, 'days');
      const allUsers = await this.getTotalNumber();
      const usersBeforeYesterday: DbDataResult<DbUser[]> = await db.query(
        'SELECT * FROM users WHERE timestamp BETWEEN $1 AND $2',
        [startDate, endDate]
      );
      return Number(allUsers) - Number(usersBeforeYesterday.rowCount);
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
  async drop(): Promise<void> {
    try {
      await db.query('DROP TABLE users');
    } catch (e: unknown) {
      throw new Error(`${e}`);
    }
  },
};

function mapDbUserToBotUser(user: DbUser): BotUser {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    skinType: user.skin_type,
    timestamp: user.timestamp,
    notificationsEnabled: user.notifications_enabled,
    wakeUpTime: user.wake_up_time,
    bedTime: user.bed_time,
    doneTasksCounter: user.done_tasks_counter,
    wasActiveToday: user.was_active_today,
  };
}
