import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AdminTableComponent } from '../../components/admin-table/admin-table.component';
import { AdminTableProviderService } from '../../services/admin-table-provider.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminPanelUser } from '@sue-bot-platform/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'sue-admin-management',
  styleUrls: ['admin-management.component.scss'],
  templateUrl: 'admin-management.component.html',
  imports: [CommonModule, MatCardModule, AdminTableComponent],
  providers: [AdminTableProviderService],
})
export class AdminManagementComponent {
  dataSource$: Observable<MatTableDataSource<AdminPanelUser>>;
  constructor(private readonly adminTableProviderService: AdminTableProviderService) {
    this.dataSource$ = this.adminTableProviderService.getDataProvider();
  }
}
