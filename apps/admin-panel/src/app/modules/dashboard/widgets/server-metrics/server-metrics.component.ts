import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { isNil } from 'lodash';
import { BotMetricsService } from '../../services/bot-metrics.service';
import { SERVER_STATUS_MAP, STATUS_COLOR_MAP, StatusColor, StatusDisplay } from '../../models/metrics.model';
import { forkJoin } from 'rxjs';
import { QueuedNotificationsMetrics, ServerMetrics } from '@sue-bot-platform/types';
@Component({
  standalone: true,
  selector: 'sue-server-metrics-widget',
  styleUrls: ['server-metrics.component.scss'],
  templateUrl: 'server-metrics.component.html',
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, InlineLoadingSpinnerComponent],
  providers: [BotMetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ServerMetricsWidgetComponent implements OnInit {
  serverMetrics: ServerMetrics | null;
  notificationsMetrics: QueuedNotificationsMetrics | null;
  isLoaded = false;

  constructor(private readonly botMetricsService: BotMetricsService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    forkJoin([this.botMetricsService.getServerMetrics(), this.botMetricsService.getNotificationsMetrics()]).subscribe(
      ([server, notifications]: [ServerMetrics, QueuedNotificationsMetrics]): void => {
        this.serverMetrics = server;
        this.notificationsMetrics = notifications;
        this.isLoaded = true;
        this.cdr.markForCheck();
      }
    );
  }

  getStatus(metrics: ServerMetrics): string {
    if (isNil(metrics?.state)) {
      return StatusDisplay.STOPPED;
    }
    if (metrics.maintenance) {
      return StatusDisplay.MAINTENANCE;
    }
    return SERVER_STATUS_MAP[metrics.state] || StatusDisplay.UNKNOWN;
  }

  getStatusColor(metrics?: ServerMetrics): string {
    if (isNil(metrics?.state)) {
      return StatusColor.ERROR;
    }
    if (metrics.maintenance) {
      return StatusColor.WARNING;
    }
    return STATUS_COLOR_MAP[metrics.state] || StatusColor.UNKNOWN;
  }

  getNotificationStatusColor(value: number, total: number, isProcessed: boolean): StatusColor {
    if (value === total) {
      return isProcessed ? StatusColor.SUCCESS : StatusColor.ERROR;
    }
    if (value === 0) {
      return isProcessed ? StatusColor.ERROR : StatusColor.SUCCESS;
    }
    return StatusColor.WARNING;
  }

  getProcessedNotificationStatusColor(value: number, total: number): StatusColor {
    return this.getNotificationStatusColor(value, total, true);
  }

  getPendingNotificationStatusColor(value: number, total: number): StatusColor {
    return this.getNotificationStatusColor(value, total, false);
  }
}
