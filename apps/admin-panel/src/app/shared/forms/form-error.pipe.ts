import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { first, isNil } from 'lodash';

export interface FormError {
    i18n: string;
    values?: Array<unknown>;
  }

@Pipe({
  name: 'FormError'
})
export class FormErrorPipe implements PipeTransform {
    transform(errors: ValidationErrors | null): string | null {
        if (isNil(errors)) {
            return null;
        }
        const error: FormError = first(Object.values(errors));
        return error.i18n;
    }
}
