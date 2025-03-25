import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

type SNACKBAR_TYPE = 'error' | 'success' | 'info';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  showMessage(
    caption: string,
    type: SNACKBAR_TYPE = 'success',
    close = 'x',
    duration = 5000
  ): MatSnackBarRef<TextOnlySnackBar> {
    switch (type) {
      case 'error':
        return this.snackBar.open(caption, close, {
          panelClass: 'negative',
          duration,
        });
      case 'success':
        return this.snackBar.open(caption, close, {
          panelClass: 'positive',
          duration,
        });
      case 'info':
        return this.snackBar.open(caption, close, {
          duration,
        });
    }
  }
}
