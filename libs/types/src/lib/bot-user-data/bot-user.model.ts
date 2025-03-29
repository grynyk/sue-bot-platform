export interface BotUserActivityMetrics {
  quantity: number;
  date: string;
}

export interface BotUserStats {
  total: number;
  active: number;
  blocked: number;
  newToday: number;
  notificationsDisabled: number;
  changedNotificationTime: number;
  completedSkinTest: number;
}

export interface BotUserStatusLogs {
  inactive: BotUserActivityMetrics[];
  active: BotUserActivityMetrics[];
  blocked: BotUserActivityMetrics[];
}
