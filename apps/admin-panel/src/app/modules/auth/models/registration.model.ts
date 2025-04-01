import { FormControl } from '@angular/forms';
import { RegistrationData as RegistrationDataApi } from '@sue-bot-platform/types';

export interface RegistrationData extends RegistrationDataApi {
  confirmPassword: string | null;
}

export type RegistrationForm = {
  [K in keyof RegistrationData]: FormControl<RegistrationData[K]>;
};
