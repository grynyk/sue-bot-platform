import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'sue-dashboard-component',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: 'dashboard.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule
  ],
})
export class DashboardComponent {}
