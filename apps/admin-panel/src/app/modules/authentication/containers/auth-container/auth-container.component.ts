import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from '../../components/login/login.component';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { AUTH_MODE } from '../../models';

@Component({
  standalone: true,
  selector: 'sue-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthContainerComponent {
  mode: AUTH_MODE = AUTH_MODE.LOGIN;
  modeEnum = AUTH_MODE;

  setAuthMode(mode: AUTH_MODE): void {
    this.mode = mode;
  }
}
