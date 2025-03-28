import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, Observable } from 'rxjs';
import { BotUserStats } from '@sue-bot-platform/api';
import { ConfigService } from '../../../services/config.service';
import { isNil } from 'lodash';
import { HerokuResponse, ServerMetrics } from '../models/heroku.model';

@Injectable()
export class MetricsService {
  private readonly herokuHeaders: HttpHeaders;
  constructor(
    private http: HttpClient,
    private readonly configService: ConfigService
  ) {
    this.herokuHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.configService.herokuApiToken}`,
      Accept: 'application/vnd.heroku+json; version=3',
    });
  }

  getBotStats(): Observable<BotUserStats> {
    return this.http
      .get(`/api/bot-users/stats`)
      .pipe(map((v: object) => v as BotUserStats));
  }

  getServerMetrics(): Observable<ServerMetrics | null> {
    const fetchHerokuData = <T>(endpoint: string): Observable<T> => {
      return this.http
        .get<object>(endpoint, {
          headers: this.herokuHeaders,
        })
        .pipe(
          map((res) => res as T),
          catchError((): Observable<never> => EMPTY)
        );
    };
  
    const server$ = fetchHerokuData<HerokuResponse>(`${this.configService.herokuApiUrl}`);
    const dyno$ = fetchHerokuData<HerokuResponse[]>(`${this.configService.herokuApiUrl}/dynos`).pipe(
      map((res: HerokuResponse[]): HerokuResponse | null =>
        isNil(res) || res.length === 0 ? null : res[0]
      )
    );
  
    return forkJoin([server$, dyno$]).pipe(
      map(([server, dyno]: [HerokuResponse, HerokuResponse | null]): ServerMetrics | null => {
        return {
          state: dyno?.state,
          maintenance: server?.maintenance,
          releaseDate: server?.released_at,
        };
      })
    );
  }
}
