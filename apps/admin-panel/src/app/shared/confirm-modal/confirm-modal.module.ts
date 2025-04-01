import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConfirmService } from './services/confirm.service';

@NgModule({
  providers: [ConfirmService],
  imports: [CommonModule, ConfirmModalComponent, MatDialogModule, MatButtonModule, MatCardModule],
  exports: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
