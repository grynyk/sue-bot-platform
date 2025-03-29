import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: string | null;
  password: string | null;
}

export type LoginFormGroup = {
  [K in keyof LoginForm]: FormControl<LoginForm[K]>;
};
