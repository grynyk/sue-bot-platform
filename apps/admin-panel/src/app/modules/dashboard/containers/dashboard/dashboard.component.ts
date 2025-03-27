import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UsersChartWidgetComponent } from '../../widgets/users-chart/users-chart.component';
import { BotMetricsWidgetComponent } from '../../widgets/bot-metrics/bot-metrics.component';
import { ServerMetricsWidgetComponent } from '../../widgets/server-metrics/server-metrics.component';

@Component({
  standalone: true,
  selector: 'sue-dashboard-component',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: 'dashboard.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    UsersChartWidgetComponent,
    BotMetricsWidgetComponent,
    ServerMetricsWidgetComponent
  ],
})
export class DashboardComponent {

}
