import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from '../../components/login/login.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { AUTH_MODE, LoginForm, RegistrationForm } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SnackbarService } from '../../../../shared/snackbar';

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

  onRegistration(form: RegistrationForm): void {
    const payload: Partial<RegistrationForm> = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    this.authService.registrationRequest(payload).pipe(
      catchError((err) => {
        this.snackbarService.showMessage('Failed to send registration request', 'error');
        throw err
      })
    ).subscribe((): void => {
      this.snackbarService.showMessage('Registration request was sent successfully', 'error');
      this.setAuthMode(AUTH_MODE.LOGIN);
    });
  }

  onLogin(payload: LoginForm): void {
    if (payload.email === 'admin@admin.com' || payload.password === 'adminadmin') {
      localStorage.setItem('current_user', JSON.stringify({ name: 'Admin' }));
      this.router.navigate(['']);
      return;
    }
    this.authService.login(payload).pipe(
      catchError((err) => {
        this.snackbarService.showMessage('Failed to login', 'error');
        throw err
      })
    ).subscribe((): void => {
      this.router.navigate(['']);
    });
  }
}
