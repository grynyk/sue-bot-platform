import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginData, LoginResponse, RegistrationData } from '@sue-bot-platform/types';
import { isNil } from 'lodash';
import { Router } from '@angular/router';
import { AdminPanelUser } from '@sue-bot-platform/api';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
  private _currentUser$: BehaviorSubject<LoginResponse>;

  get currentUser$(): Observable<LoginResponse> {
    return this._currentUser$.asObservable();
  }

  get isLoggedIn(): boolean {
    return !isNil(this._currentUser$.value);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser: string | null = localStorage.getItem('current_user');
    const currentUser: LoginResponse | null = storedUser ? JSON.parse(storedUser) : null;
    this._currentUser$ = new BehaviorSubject<LoginResponse>(currentUser);
  }

  login({ email, password }: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        throw error;
      })
    );
  }

  registrationRequest(payload: RegistrationData): Observable<AdminPanelUser> {
    return this.http.post(`${this.baseUrl}/request`, payload).pipe(
      map((v: object) => v as AdminPanelUser),
      catchError((error: HttpErrorResponse): Observable<never> => {
        throw error;
      })
    );
  }

  setUser(user: LoginResponse): void {
    localStorage.setItem('current_user', JSON.stringify(user));
    this._currentUser$.next(user);
  }

  logout(): void {
    localStorage.removeItem('current_user');
    this._currentUser$.next(null);
    this.router.navigate(['login']);
  }
}
