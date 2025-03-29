import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { InlineLoadingSpinnerComponent } from '../../../../shared';
import { ChartDataSeries } from '../../models/chart.model';

@Component({
  standalone: true,
  selector: 'sue-users-chart-widget',
  templateUrl: 'users-chart.component.html',
  styleUrl: 'users-chart.component.scss',
  imports: [CommonModule, RouterModule, MatCardModule, ChartsModule, InlineLoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersChartWidgetComponent {
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  timeline = true;
  isLoaded: boolean;
  colorScheme: Color;
  view: [number, number];
  data: { name: string; series: ChartDataSeries[] }[];

  constructor() {
    this.data = [
      {
        name: 'Registered Users',
        series: [
          { name: new Date('2025-03-20'), value: 28 },
          { name: new Date('2025-03-21'), value: 37 },
          { name: new Date('2025-03-22'), value: 45 },
          { name: new Date('2025-03-23'), value: 52 },
          { name: new Date('2025-03-24'), value: 61 },
          { name: new Date('2025-03-25'), value: 73 },
          { name: new Date('2025-03-26'), value: 85 },
          { name: new Date('2025-03-27'), value: 96 },
        ],
      },
      {
        name: 'Unavailable Users',
        series: [
          { name: new Date('2025-03-20'), value: 1 },
          { name: new Date('2025-03-21'), value: 2 },
          { name: new Date('2025-03-22'), value: 0 },
          { name: new Date('2025-03-23'), value: 5 },
          { name: new Date('2025-03-24'), value: 0 },
          { name: new Date('2025-03-25'), value: 32 },
          { name: new Date('2025-03-26'), value: 0 },
          { name: new Date('2025-03-27'), value: 10 },
        ],
      },
      {
        name: 'Active Users',
        series: [
          { name: new Date('2025-03-20'), value: 54 },
          { name: new Date('2025-03-21'), value: 130 },
          { name: new Date('2025-03-22'), value: 254 },
          { name: new Date('2025-03-23'), value: 5 },
          { name: new Date('2025-03-24'), value: 10 },
          { name: new Date('2025-03-25'), value: 756 },
          { name: new Date('2025-03-26'), value: 230 },
          { name: new Date('2025-03-27'), value: 39 },
        ],
      },
    ];
    this.colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#347de0', '#9b000e', '#508b1b'],
    };
    this.view = [window.innerWidth * 0.62, 360];
    this.isLoaded = true;
  }
}
