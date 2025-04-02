import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminPanelUser } from '@sue-bot-platform/api';
import { MatTableDataSource } from '@angular/material/table';

@Injectable()
export class AdminTableProviderService {
  private baseUrl = '/api/admin';

  constructor(
    private http: HttpClient,
  ) {}

  getDataProvider(): Observable<MatTableDataSource<AdminPanelUser>> {
    return this.http.get(`${this.baseUrl}/users`).pipe(
      map((v: AdminPanelUser[]): MatTableDataSource<AdminPanelUser> => new MatTableDataSource<AdminPanelUser>(v)),
      catchError((error: HttpErrorResponse): Observable<never> => {
        throw error;
      })
    );
  }
}
