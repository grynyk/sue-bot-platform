import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/services/auth.service';
import { SnackbarService } from '../../shared';
import { LoginResponse } from '@sue-bot-platform/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.currentUser$.pipe(
      take(1),
      switchMap((loginResponse: LoginResponse) => {
        const token: string = loginResponse?.access_token || '';
        const clonedRequest: HttpRequest<unknown> = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(clonedRequest).pipe(
          catchError((error: HttpErrorResponse): Observable<never> => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.snackbarService.showMessage(error.error.message);
              this.authService.logout();
              this.router.navigate(['/login']);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
