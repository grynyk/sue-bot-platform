export enum NOTIFICATION_TYPE {
  WATER_NOTIFICATION = 'WATER_NOTIFICATION',
  SCHEDULED_NOTIFICATION = 'SCHEDULED_NOTIFICATION',
}

export enum RECURRENCE_PATTERN {
  EVERY_DAY = 'EVERY_DAY',
  SATURDAY = 'SATURDAY',
}

export interface DbNotification {
  id: string;
  type: NOTIFICATION_TYPE;
  captions: string[];
  image_source: string | null;
  reply_buttons: string[] | null;
  recurrence_pattern: RECURRENCE_PATTERN;
  minutes_before_sleep: number | null;
  minutes_after_wakeup: number | null;
}

export interface BotNotification {
  id?: string;
  type: NOTIFICATION_TYPE;
  captions: string[];
  imageSource: string | null;
  replyButtons: string[] | null;
  recurrencePattern: RECURRENCE_PATTERN;
  minutesBeforeSleep: number | null;
  minutesAfterWakeup: number | null;
}
