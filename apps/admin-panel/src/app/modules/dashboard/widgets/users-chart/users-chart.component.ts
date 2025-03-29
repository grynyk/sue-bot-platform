import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { ChartDataSeries } from '../../models/chart.model';
import { BotMetricsService } from '../../services/bot-metrics.service';
import { BOT_USER_STATUS, BotUserActivityMetrics } from '@sue-bot-platform/types';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  selector: 'sue-users-chart-widget',
  templateUrl: 'users-chart.component.html',
  styleUrl: 'users-chart.component.scss',
  imports: [CommonModule, RouterModule, MatCardModule, ChartsModule, InlineLoadingSpinnerComponent],
  providers: [BotMetricsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersChartWidgetComponent implements OnInit {
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  timeline = true;
  isLoaded: boolean;
  colorScheme: Color;
  view: [number, number];
  data: { name: string; series: ChartDataSeries[] }[];

  constructor(private readonly botMetricsService: BotMetricsService, private readonly cdr: ChangeDetectorRef) {
    this.data = [];
    this.isLoaded = false;
    this.colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#347de0', '#9b000e', '#508b1b'],
    };
    const width: number = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth * 0.62;
    const height = 360;
    this.view = [width, height];
  }

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    forkJoin([
      this.botMetricsService.getBotUsersMetrics(BOT_USER_STATUS.ACTIVE),
      this.botMetricsService.getBotUsersMetrics(BOT_USER_STATUS.BLOCKED),
    ]).subscribe(([active, blocked]: [BotUserActivityMetrics[], BotUserActivityMetrics[]]): void => {
      this.data = [
        {
          name: 'Active Users',
          series: this.mapToChartSeries(active),
        },
        {
          name: 'Blocked Users',
          series: this.mapToChartSeries(blocked),
        },
      ];
      this.isLoaded = true;
      this.cdr.markForCheck();
    });
  }

  private mapToChartSeries(data: BotUserActivityMetrics[]): ChartDataSeries[] {
    return data.map(
      (item: BotUserActivityMetrics): ChartDataSeries => ({
        name: item.date,
        value: item.quantity,
      })
    );
  }
}
