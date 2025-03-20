import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  RegistrationForm,
  RegistrationFormGroup,
} from '../../models/registration-request.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'sue-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegistrationComponent {
  @Output() submitted: EventEmitter<Partial<RegistrationForm>> =
    new EventEmitter<Partial<RegistrationForm>>();

  formGroup: FormGroup<RegistrationFormGroup>;

  get password(): FormControl<string | null> {
    return this.formGroup.controls.password;
  }

  get email(): FormControl<string | null> {
    return this.formGroup.controls.email;
  }

  get name(): FormControl<string | null> {
    return this.formGroup.controls.name;
  }

  get confirmPassword(): FormControl<string | null> {
    return this.formGroup.controls.confirmPassword;
  }

  constructor() {
    this.formGroup = new FormGroup<RegistrationFormGroup>({
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
      confirmPassword: new FormControl<string | null>(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted.emit({
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    });
  }
}
