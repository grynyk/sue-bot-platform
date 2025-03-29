import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManagementComponent } from './containers/admin-management/admin-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminManagementRoutingModule {}
