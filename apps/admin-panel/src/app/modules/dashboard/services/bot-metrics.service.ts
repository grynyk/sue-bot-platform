import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BOT_USER_STATUS, BotUserActivityMetrics, BotUserStats, QueuedNotificationsMetrics, ServerMetrics } from '@sue-bot-platform/types';
import { map, Observable } from 'rxjs';


@Injectable()
export class BotMetricsService {
  constructor(private readonly http: HttpClient) {}

  getBotUsersStats(): Observable<BotUserStats> {
    return this.http.get(`/api/bot-users/stats`).pipe(map((v: object) => v as BotUserStats));
  }

  getBotUsersMetrics(status: BOT_USER_STATUS): Observable<BotUserActivityMetrics[]> {
    return this.http.get(`/api/bot-users/metrics?status=${status}`).pipe(
      map((v: object) => v as BotUserActivityMetrics[])
    );
  }

  getServerMetrics(): Observable<ServerMetrics> {
    return this.http.get(`/api/server/metrics`).pipe(map((v: object) => v as ServerMetrics));
  }

  getNotificationsMetrics(): Observable<QueuedNotificationsMetrics> {
    return this.http.get(`/api/notifications/metrics`).pipe(map((v: object) => v as QueuedNotificationsMetrics));
  }
}
