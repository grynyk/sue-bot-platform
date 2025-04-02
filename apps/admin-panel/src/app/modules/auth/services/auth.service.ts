import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginData, LoginResponse, RegistrationData } from '@sue-bot-platform/types';
import { Router } from '@angular/router';
import { AdminPanelUser } from '@sue-bot-platform/api';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/auth';
  private _currentUser$: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);

  get currentUser$(): Observable<LoginResponse | null> {
    return this._currentUser$.asObservable();
  }

  get isLoggedIn(): boolean {
    return !isNil(this._currentUser$.value);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser: string = localStorage.getItem('current_user');
    if (storedUser) {
      this._currentUser$.next(JSON.parse(storedUser));
    }
  }

  login({ email, password }: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      map((user: LoginResponse): LoginResponse=> {
        this.setUser(user);
        return user;
      }),
      catchError((error: HttpErrorResponse): Observable<never> => {
        throw error;
      })
    );
  }

  registrationRequest(payload: RegistrationData): Observable<AdminPanelUser> {
    return this.http.post(`${this.baseUrl}/access`, payload).pipe(
      map((v: object): AdminPanelUser => v as AdminPanelUser),
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
