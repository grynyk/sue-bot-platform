import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ConfirmModalData } from '../models';
import { ConfirmBase } from '../models/confirm';

@Injectable()
export class ConfirmService implements ConfirmBase {
  constructor(private readonly dialog: MatDialog) {}
  confirm(data: ConfirmModalData): Observable<boolean | undefined> {
    return this.dialog
      .open<ConfirmModalComponent, ConfirmModalData, boolean>(
        ConfirmModalComponent,
        {
          data,
          disableClose: true,
        }
      )
      .afterClosed();
  }
}
