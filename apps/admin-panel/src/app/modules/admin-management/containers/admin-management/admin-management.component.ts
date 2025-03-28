import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';
import { AdminTableComponent } from '../../components/admin-table/admin-table.component';
import { AdminItem } from '../../models/admin-list.model';
import { ADMIN_ROLE } from '../../models/admin-item.model';

@Component({
  selector: 'sue-admin-management',
  styleUrls: ['admin-management.component.scss'],
  templateUrl: 'admin-management.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    AdminTableComponent
  ]
})
export class AdminManagementComponent {
  data$: Observable<AdminItem[]> = of([
    {
      id: 0,
      name: 'John Doe',
      email: 'john@doe.com',
      role: ADMIN_ROLE.ADMIN,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 1,
      name: 'Anna Rose',
      email: 'anna@rose.com',
      role: ADMIN_ROLE.GUEST,
      status: 'Inactive',
      lastLogin: '2023-11-01',
      createdAt: '2023-02-01',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@smith.com',
      role: ADMIN_ROLE.ADMIN,
      status: 'Active',
      lastLogin: '2023-05-01',
      createdAt: '2023-02-01',
    },
    {
      id: 3,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 4,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 5,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 6,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 7,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 8,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 9,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 10,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 11,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 12,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.MODERATOR,
      status: 'Active',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    },
    {
      id: 13,
      name: 'Jack Black',
      email: 'jack@black.com',
      role: ADMIN_ROLE.ADMIN,
      status: 'Inactive',
      lastLogin: '2023-10-01',
      createdAt: '2023-01-01',
    }
  ]);
}
