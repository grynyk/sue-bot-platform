import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynoStatus } from '../models/heroku.model';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';

@Injectable()
export class DynoService {
  env: Record<GLOBAL_VARIABLES, string>;
  constructor(private http: HttpClient) {}
  getDynoStatus(): Observable<DynoStatus> {
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.env.HEROKU_API_TOKEN}`,
      'Accept': 'application/vnd.heroku+json; version=3'
    });
    return this.http.get(`${this.env.HEROKU_API_URL}/dynos`, { headers }) as Observable<DynoStatus> ;
  }
}
