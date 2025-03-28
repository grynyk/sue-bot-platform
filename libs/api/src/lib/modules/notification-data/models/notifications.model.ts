export enum RECURRENCE_PATTERN {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  DAILY = 'DAILY',
  WEEKDAYS = 'WEEKDAYS',
  WEEKENDS = 'WEEKENDS',
}

export enum SCHEDULE_TYPE {
  EXACT_TIME = 'EXACT_TIME',
  WAKE_UP_OFFSET = 'WAKE_UP_OFFSET',
  BED_TIME_OFFSET = 'BED_TIME_OFFSET',
}

export interface QueuedNotificationsMetrics {
  total: number;
  queued: number;
  processed: number;
}
