import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { isNil } from 'lodash';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { AdminPanelUser } from '@sue-bot-platform/api';
@Component({
  selector: 'sue-admin-table',
  styleUrls: ['admin-table.component.scss'],
  templateUrl: 'admin-table.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
  ],
})
export class AdminTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() dataSource: MatTableDataSource<AdminPanelUser>;

  displayedColumns: string[] = ['select', 'email', 'name', 'role', 'status', 'lastLogin', 'createdAt'];
  selection: SelectionModel<AdminPanelUser>;;
  resultsLength: number;

  ngOnInit(): void {
    this.resultsLength = this.dataSource.data.length;
    this.selection = new SelectionModel<AdminPanelUser>(false, []);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeRole(): void {
    const user: AdminPanelUser = this.selection.selected[0];
    if (isNil(user)) {
      return;
    }
  }

  toggleStatus(): void {
    const user: AdminPanelUser = this.selection.selected[0];
    if (isNil(user)) {
      return;
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
