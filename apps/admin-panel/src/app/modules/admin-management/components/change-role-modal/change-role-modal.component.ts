import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminItem } from '../../models/admin-list.model';
import { ADMIN_ROLE } from '../../models/admin-item.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DropdownOption, getDropdownOptionsFromEnum } from '../../../../shared';

@Component({
  selector: 'sue-change-role-modal',
  templateUrl: './change-role-modal.component.html',
  styleUrls: ['./change-role-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ChangeRoleModalComponent implements OnInit {
  roleControl: FormControl<ADMIN_ROLE>;
  roleOptions: DropdownOption[];
  constructor(
    public dialogRef: MatDialogRef<ChangeRoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public adminItem: AdminItem
  ) {
    this.roleControl = new FormControl<ADMIN_ROLE>(adminItem.role);
  }

  ngOnInit(): void {
    this.roleOptions = getDropdownOptionsFromEnum(ADMIN_ROLE);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.dialogRef.close(this.roleControl.value);
  }
}
