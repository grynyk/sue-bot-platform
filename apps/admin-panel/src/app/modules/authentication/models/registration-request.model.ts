import { FormControl } from "@angular/forms";

export interface RegistrationForm {
    name: string | null;
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
}
  
export type RegistrationFormGroup = { [K in keyof RegistrationForm]: FormControl<RegistrationForm[K]> };
