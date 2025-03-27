import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DynoStatus } from '../models/heroku.model';
import { ConfigService } from '../../../services/config.service';

@Injectable()
export class DynoService {
  constructor(
    private http: HttpClient,
    private readonly configService: ConfigService
  ) {}

  getDynoStatus(): Observable<DynoStatus> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.configService.herokuApiToken}`,
      Accept: 'application/vnd.heroku+json; version=3',
    });
    return this.http
      .get(`${this.configService.herokuApiUrl}/dynos`, { headers })
      .pipe(
        map((res): DynoStatus[] => res as DynoStatus[]),
        map((res: DynoStatus[]) => res[0])
      );
  }
}
