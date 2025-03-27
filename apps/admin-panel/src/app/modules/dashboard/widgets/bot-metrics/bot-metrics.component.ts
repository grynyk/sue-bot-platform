import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { BotUserStats } from '@sue-bot-platform/api';
import { MetricsService } from '../../services/metrics.service';
@Component({
  standalone: true,
  selector: 'sue-bot-metrics-widget',
  styleUrls: ['bot-metrics.component.scss'],
  templateUrl: 'bot-metrics.component.html',
  imports: [CommonModule, RouterModule, MatCardModule, ChartsModule],
  providers: [MetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotMetricsWidgetComponent implements OnInit {
  isLoaded = false;
  data: { name: string; value: number; }[] | null = null;
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
  };
  view: [number, number] = [window.innerWidth * 0.33, 425];

  constructor(private readonly metricsService: MetricsService, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.metricsService.getBotStats().subscribe((metrics: BotUserStats): void => {
      this.data = [
        { name: 'All', value: metrics.total },
        { name: 'New', value: metrics.newToday },
        { name: 'Blocked', value: metrics.blocked },
        { name: 'Active today', value: metrics.active },
        { name: 'Disabled notifications', value: metrics.notificationsDisabled },
        { name: 'Completed skin type test', value: metrics.completedSkinTest },
      ];
      this.isLoaded = true;
      this.cdr.markForCheck();
    });
  }
}
