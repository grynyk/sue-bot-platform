import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BotUserStats } from '@sue-bot-platform/api';

@Injectable()
export class MetricsService {
  constructor(private http: HttpClient) {}
  getBotStats(): Observable<BotUserStats> {
    return this.http
      .get(`/api/bot-users/stats`)
      .pipe(map((v: object) => v as BotUserStats));
  }
}
