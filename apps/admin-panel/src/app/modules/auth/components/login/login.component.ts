import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm, LoginFormGroup } from '../../models/login.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormErrorPipe, FormValidators } from '../../../../shared/forms';

@Component({
  standalone: true,
  selector: 'sue-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormErrorPipe
  ],
})
export class LoginComponent {
  @Output() submitted: EventEmitter<LoginForm> = new EventEmitter<LoginForm>();
  formGroup: FormGroup<LoginFormGroup>;

  get email(): FormControl<string | null> {
    return this.formGroup.controls.email;
  }

  get password(): FormControl<string | null> {
    return this.formGroup.controls.password;
  }

  constructor() {
    this.formGroup = new FormGroup<LoginFormGroup>({
      email: new FormControl<string | null>(null, [
        FormValidators.required,
        FormValidators.email,
      ]),
      password: new FormControl<string | null>(null, [
        FormValidators.required,
        FormValidators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted.emit(this.formGroup.getRawValue());
  }
}
