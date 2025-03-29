import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminItem } from '../../models/admin-list.model';
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
    MatMenuModule
  ]
})
export class AdminTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: AdminItem[];

  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'status', 'lastLogin', 'createdAt'];
  dataSource: MatTableDataSource<AdminItem>;
  selection: SelectionModel<AdminItem>;
  resultsLength: number;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<AdminItem>(this.data);
    this.resultsLength = this.data.length;
    this.selection = new SelectionModel<AdminItem>(false, []);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  changeRole(): void {
    const adminItem: AdminItem = this.selection.selected[0];
    if (isNil(adminItem)) {
      return;
    }
  }

  toggleStatus(): void {
    const adminItem: AdminItem = this.selection.selected[0];
    if (isNil(adminItem)) {
      return;
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
