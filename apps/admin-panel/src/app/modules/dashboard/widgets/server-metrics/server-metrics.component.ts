import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { MetricsService } from '../../services/metrics.service';
import { ServerMetrics, ServerState } from '../../models/heroku.model';
import { isNil } from 'lodash';

@Component({
  standalone: true,
  selector: 'sue-server-metrics-widget',
  styleUrls: ['server-metrics.component.scss'],
  templateUrl: 'server-metrics.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    InlineLoadingSpinnerComponent
  ],
  providers: [MetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ServerMetricsWidgetComponent implements OnInit {
  notificationsToSend = 1235;
  notificationsSent = 800;
  serverMetrics: ServerMetrics | null;
  isLoaded = false;

  constructor(private readonly metricsService: MetricsService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.metricsService.getServerMetrics().subscribe((metrics: ServerMetrics | null): void => {
      console.log(metrics)
      this.serverMetrics = metrics;
      this.isLoaded = true;
      this.cdr.markForCheck();
    });
  }

  getStatus(metrics: ServerMetrics): string {
    if (isNil(metrics?.state)) {
      return 'Stopped';
    }
    if (metrics.maintenance) {
      return 'Maintenance';
    }
    switch (metrics.state) {
      case ServerState.UP:
        return 'Running';
      case ServerState.CRASHED:
        return 'Stopped';
      case ServerState.STARTING:
        return 'Starting';
      default:
        return 'Unknown';
    }
  }

  getStatusColor(metrics?: ServerMetrics): string {
    if (isNil(metrics?.state)) {
      return '#9b000e';
    }
    if (metrics.maintenance) {
      return '#f8ab37';
    }
    switch (metrics.state) {
      case ServerState.UP:
        return '#508b1b';
      case ServerState.CRASHED:
        return '#9b000e';
      case ServerState.STARTING:
        return '#9fd45f';
      default:
        return '#646973';
    }
  }
}
