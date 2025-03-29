import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { AdminManagementComponent } from './containers/admin-management/admin-management.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';

@NgModule({
  imports: [CommonModule, AdminManagementComponent, AdminTableComponent, AdminManagementRoutingModule],
})
export class AdminManagementModule {}
