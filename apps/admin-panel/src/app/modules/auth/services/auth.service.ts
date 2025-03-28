import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginForm } from '../models/login.model';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
import { RegistrationForm } from '../models';

@Injectable()
export class AuthService {
  private baseUrl = '/api/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(payload: LoginForm): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.baseUrl}/login`, payload).pipe(
      tap((response): void => {
        if (isNil(response)) {
          return;
        }
        localStorage.setItem('current_user', JSON.stringify(response));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('current_user');
    this.router.navigate(['login']);
  }

  registrationRequest(payload: Partial<RegistrationForm>): Observable<object> {
    return this.httpClient.post(`${this.baseUrl}/registration`, payload);
  }
}
