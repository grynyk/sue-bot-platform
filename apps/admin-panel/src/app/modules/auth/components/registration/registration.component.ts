import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistrationData, RegistrationForm } from '../../models/registration.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormErrorPipe, FormValidators } from '../../../../shared';

@Component({
  standalone: true,
  selector: 'sue-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, FormErrorPipe],
})
export class RegistrationComponent {
  @Output() submitted: EventEmitter<RegistrationData> = new EventEmitter<RegistrationData>();

  formGroup: FormGroup<RegistrationForm>;

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
    this.formGroup = new FormGroup<RegistrationForm>({
      name: new FormControl<string | null>(null, [FormValidators.required, FormValidators.minLength(6)]),
      email: new FormControl<string | null>(null, [FormValidators.required, FormValidators.email]),
      password: new FormControl<string | null>(null, [FormValidators.minLength(6), FormValidators.required]),
      confirmPassword: new FormControl<string | null>(null, [FormValidators.minLength(6), FormValidators.required]),
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted.emit(this.formGroup.getRawValue());
  }
}
