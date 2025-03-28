import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { isNil } from 'lodash-es';
import { BotMetricsService } from '../../services/bot-metrics.service';
import { SERVER_STATUS_MAP, ServerMetrics, STATUS_COLOR_MAP, StatusColor, StatusDisplay } from '../../models/metrics.model';
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
    InlineLoadingSpinnerComponent,
  ],
  providers: [BotMetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ServerMetricsWidgetComponent implements OnInit {
  notificationsToSend = 1235;
  notificationsSent = 800;
  serverMetrics: ServerMetrics | null;
  isLoaded = false;

  constructor(
    private readonly botMetricsService: BotMetricsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.botMetricsService
      .getServerMetrics()
      .subscribe((metrics: ServerMetrics | null): void => {
        this.serverMetrics = metrics;
        this.isLoaded = true;
        this.cdr.markForCheck();
      });
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
      return StatusColor.STOPPED;
    }
    if (metrics.maintenance) {
      return StatusColor.MAINTENANCE;
    }
    return STATUS_COLOR_MAP[metrics.state] || StatusColor.UNKNOWN;
  }
}
