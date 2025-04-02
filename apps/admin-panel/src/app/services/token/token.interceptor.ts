import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { SnackbarService } from '../../shared';
import { LoginResponse } from '@sue-bot-platform/types';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.currentUser$.pipe(
      filter((res: LoginResponse | null): boolean => !isNil(res)),
      take(1),
      switchMap((loginResponse: LoginResponse): Observable<HttpEvent<unknown>> => {
        const token: string = loginResponse.access_token;
        const clonedRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });

        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse): Observable<never> => {
            if (error.status === 401) {
              this.snackbarService.showMessage(error.error.message || 'Unauthorized');
              this.authService.logout();
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
