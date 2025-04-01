import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { SnackbarService } from '../../shared';
import { LoginResponse } from '@sue-bot-platform/types';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.currentUser$.pipe(
      take(1),
      switchMap((loginResponse: LoginResponse) => {
        const token: string = loginResponse?.access_token || '';
        const clonedRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(clonedRequest).pipe(
          catchError((e: HttpErrorResponse): Observable<never> => {
            this.snackbarService.showMessage(e.error.message);
            return EMPTY;
          })
        );
      })
    );
  }
}
