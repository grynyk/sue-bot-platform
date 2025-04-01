import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { ChartData, ChartDataSeries } from '../../models/chart.model';
import { BotMetricsService } from '../../services/bot-metrics.service';
import { BOT_USER_STATUS, BotUserActivityMetrics } from '@sue-bot-platform/types';
import { forkJoin } from 'rxjs';
import { ScreenSizeService } from '../../../../services';

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
  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  timeline: boolean;
  isLoaded: boolean;
  colorScheme: Color;
  data: ChartData[];
  view: [number, number];

  constructor(
    private readonly botMetricsService: BotMetricsService,
    private readonly screenSizeService: ScreenSizeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.data = [];
    this.isLoaded = false;
    this.setChartConfig();
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

  private setChartConfig(): void {
    const isMobile: boolean = this.screenSizeService.isMobile();
    const width: number = isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.55;
    const height: number = isMobile ? 200 : 350;
    this.view = [width, height];
    this.timeline = !isMobile;
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = true;
    this.colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#347de0', '#9b000e', '#508b1b'],
    };
  }
}
