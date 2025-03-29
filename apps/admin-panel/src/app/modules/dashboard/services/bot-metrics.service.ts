import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BotUserStats, QueuedNotificationsMetrics } from '@sue-bot-platform/api';
import { ServerMetrics } from '../models/metrics.model';

@Injectable()
export class BotMetricsService {
  constructor(private readonly http: HttpClient) {}

  getBotStats(): Observable<BotUserStats> {
    return this.http.get(`/api/bot-users/stats`).pipe(map((v: object) => v as BotUserStats));
  }

  getServerMetrics(): Observable<ServerMetrics> {
    return this.http.get(`/api/server-metrics`).pipe(map((v: object) => v as ServerMetrics));
  }

  getNotificationsMetrics(): Observable<QueuedNotificationsMetrics> {
    return this.http.get(`/api/notifications/metrics`).pipe(map((v: object) => v as QueuedNotificationsMetrics));
  }
}
