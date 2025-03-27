import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'sue-server-metrics-widget',
  styleUrls: ['server-metrics.component.scss'],
  templateUrl: 'server-metrics.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ServerMetricsWidgetComponent {
  botStatus = 'Running';
  serverStatus = 'Awake';
  notificationsToSend = 1235;
  notificationsSent = 800;
  version = '1.0.15';

  getBotStatusColor(status: string): string {
    switch (status) {
      case 'Running':
        return 'green';
      case 'Crashed':
        return 'red';
      case 'Maintenance':
        return 'yellow';
      default:
        return 'gray';
    }
  }

  getServerStatusColor(status: string): string {
    switch (status) {
      case 'Awake':
        return 'green';
      case 'Sleeping':
        return 'yellow';
      default:
        return 'gray';
    }
  }
}