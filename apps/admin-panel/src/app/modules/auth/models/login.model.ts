import { FormControl } from '@angular/forms';
import { LoginData } from '@sue-bot-platform/types';

export type LoginForm = {
  [K in keyof LoginData]: FormControl<LoginData[K]>;
};
