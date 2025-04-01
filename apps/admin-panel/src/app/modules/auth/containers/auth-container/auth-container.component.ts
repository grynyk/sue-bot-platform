import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from '../../components/login/login.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { AUTH_MODE, RegistrationData } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { SnackbarService } from '../../../../shared/snackbar';
import { LoginData, LoginResponse } from '@sue-bot-platform/types';
import { RegistrationData as RegistrationDataApi } from '@sue-bot-platform/types';

@Component({
  standalone: true,
  selector: 'sue-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss',
  imports: [CommonModule, MatCardModule, LoginComponent, RegistrationComponent],
  providers: [AuthService],
})
export class AuthContainerComponent {
  mode: AUTH_MODE = AUTH_MODE.LOGIN;
  readonly AUTH_MODE = AUTH_MODE;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
  ) {
    this.authService.logout();
  }

  setAuthMode(mode: AUTH_MODE): void {
    this.mode = mode;
  }

  onRegistration(form: RegistrationData): void {
    const payload: RegistrationDataApi = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    this.authService
      .registrationRequest(payload)
      .pipe(
        catchError((): Observable<never> => {
          this.snackbarService.showMessage('Failed to send registration request', 'error');
          return EMPTY
        })
      )
      .subscribe((): void => {
        this.snackbarService.showMessage('Registration request was sent successfully', 'error');
        this.setAuthMode(AUTH_MODE.LOGIN);
      });
  }

  onLogin(payload: LoginData): void {
    this.authService.login(payload).subscribe({
      next: (loginResponse: LoginResponse) => {
        this.authService.setUser(loginResponse);
        this.router.navigate(['']);
      },
      error: (): void => {
        this.snackbarService.showMessage('Failed to login', 'error');
      }
    });
  }
}
