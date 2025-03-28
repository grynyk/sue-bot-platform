import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UsersChartWidgetComponent } from '../../widgets/users-chart/users-chart.component';
import { BotUsersMetricsWidgetComponent } from '../../widgets/bot-users-metrics/bot-users-metrics.component';
import { ServerMetricsWidgetComponent } from '../../widgets/server-metrics/server-metrics.component';
import { BroadcastMessageWidgetComponent } from '../../widgets/broadcast-message/broadcast-message.component';

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
    BotUsersMetricsWidgetComponent,
    ServerMetricsWidgetComponent,
    BroadcastMessageWidgetComponent
  ],
})
export class DashboardComponent {

}
