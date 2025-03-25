import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isString, isNil, includes } from 'lodash';

export class FormValidators {
  static required(control: AbstractControl): ValidationErrors | null {
    if (Validators.required(control)) {
      return {
        required: {
          i18n: 'This field is required.',
        },
      };
    }
    return null;
  }

  static minLength(length: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (Validators.minLength(length)(control)) {
        return {
          minLength: {
            i18n: `Minimal length is ${length}.`,
          },
        };
      }

      return null;
    };
  }

  static maxLength(length: number): ValidatorFn {
    return (control: AbstractControl) => {
      if (Validators.maxLength(length)(control)) {
        return {
          maxLength: {
            i18n: `Maximal length is ${length}.`,
          },
        };
      }

      return null;
    };
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (Validators.email(control)) {
      return {
        email: {
          i18n: 'Not valid email.',
        },
      };
    }
    return null;
  }

  static onlyCharsAndNumbers(
    control: AbstractControl
  ): ValidationErrors | null {
    const regexpCharsPattern = /^[a-zA-Z0-9]+$/;
    if (
      isString(control.value) &&
      control.value.length &&
      !control.value.match(regexpCharsPattern)
    ) {
      return {
        onlyCharsAndNumbers: {
          i18n: 'Should contain only letters and numbers.',
        },
      };
    }
    return null;
  }

  static regexPattern(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      if (isString(control.value) && Validators.pattern(pattern)(control)) {
        return {
          regexPattern: {
            i18n: 'Invalid value.',
          },
        };
      }
      return null;
    };
  }

  static url(control: AbstractControl): ValidationErrors | null {
    if (isNil(control.value) || control.value === '') {
      return null;
    }
    if (!isString(control.value)) {
      return {
        regexPattern: {
          i18n: 'Invalid url.',
        },
      };
    }
    try {
      const value: string = control.value.trim();
      /**
       * The `URL` constructor attempts to create a new URL object from the given
       * string. If the input string is not a valid absolute URL,
       * a `TypeError` will be thrown and catch block will return an error.
       */
      const url: URL = new URL(value);
      const validProtocols: string[] = ['http:', 'https:'];
      if (!includes(validProtocols, url.protocol)) {
        throw new Error();
      }
      return null;
    } catch {
      return {
        regexPattern: { i18n: 'Invalid url.' },
      };
    }
  }
}
