import { User } from 'telegraf/typings/core/types/typegram';

export interface DbUser {
  id: string | number;
  first_name: string;
  last_name: string;
  username: string;
  skin_type: string | null;
  timestamp: string;
  notifications_enabled: boolean;
  wake_up_time: string;
  bed_time: string;
  done_tasks_counter: number;
  was_active_today: boolean;
}

export interface BotUser {
  id: string | number;
  firstName: string;
  lastName: string;
  username: string;
  skinType: string | null;
  timestamp: string;
  notificationsEnabled: boolean;
  wakeUpTime: string;
  bedTime: string;
  doneTasksCounter: number;
  wasActiveToday: boolean;
}

export interface UsersDatabaseMiddlewareModel {
  init: () => Promise<void>;
  createOne: (user: User) => Promise<void>;
  updateBasicInfo: (user: User) => Promise<void>;
  updateNotificationsFlagByUserId: (flag: boolean, id: string) => Promise<void>;
  incrementDoneTasksCounterByUserId: (id: string) => Promise<void>;
  resetDoneTasksCounterToAllUsers: () => Promise<void>;
  resetWasActiveTodayFlagToAllUsers: () => Promise<void>;
  getAllActiveToday: () => Promise<number>;
  getAllDoneTasksToday: () => Promise<number>;
  updateSkinTypeByUserId: (skinType: string, id: string) => Promise<void>;
  updateNotificationsWakeUpTimeByUserId: (
    time: string,
    id: string
  ) => Promise<void>;
  updateNotificationsBedTimeByUserId: (
    time: string,
    id: string
  ) => Promise<void>;
  getById: (id: string) => Promise<BotUser>;
  deleteById: (id: string) => Promise<void>;
  getAll: () => Promise<BotUser[]>;
  getTotalNumber: () => Promise<number>;
  getAllWithDisabledNotifications: () => Promise<number>;
  getAllWithChangedNotificationsTime: () => Promise<number>;
  getAllWhoCompletedSkinTest: () => Promise<number>;
  getRecentRegistered: () => Promise<BotUser[]>;
  getRecentRegisteredDiff: () => Promise<number>;
  drop: () => Promise<void>;
}
