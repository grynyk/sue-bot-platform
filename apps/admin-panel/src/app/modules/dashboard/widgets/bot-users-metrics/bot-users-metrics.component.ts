import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { BotUserStats } from '@sue-bot-platform/api';
import { BotMetricsService } from '../../services/bot-metrics.service';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { ChartDataSeries } from '../../models/chart.model';
@Component({
  standalone: true,
  selector: 'sue-bot-users-metrics-widget',
  templateUrl: 'bot-users-metrics.component.html',
  imports: [CommonModule, RouterModule, MatCardModule, ChartsModule, InlineLoadingSpinnerComponent],
  providers: [BotMetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotUsersMetricsWidgetComponent implements OnInit {
  isLoaded: boolean;
  data: ChartDataSeries[];
  colorScheme: Color;
  view: [number, number];

  constructor(
    private readonly botMetricsService: BotMetricsService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#000000', '#347de0', '#9b000e', '#508b1b', '#afb4bb', '#888440'],
    };
    this.view = [window.innerWidth * 0.3, 410];
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.botMetricsService.getBotStats().subscribe((metrics: BotUserStats): void => {
      this.data = [
        { name: 'All', value: metrics.total },
        { name: 'New', value: metrics.newToday },
        { name: 'Blocked', value: metrics.blocked },
        { name: 'Active today', value: metrics.active },
        {
          name: 'Disabled notifications',
          value: metrics.notificationsDisabled,
        },
        {
          name: 'Completed skin type test',
          value: metrics.completedSkinTest,
        },
      ];
      this.isLoaded = true;
      this.cdr.markForCheck();
    });
  }
}
