import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';
import { InlineLoadingSpinnerComponent } from '../../../../shared';

@Component({
  standalone: true,
  selector: 'sue-users-chart-widget',
  templateUrl: 'users-chart.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ChartsModule,
    InlineLoadingSpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersChartWidgetComponent {
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Registered users';
  timeline = true;
  isLoaded: boolean;
  colorScheme: Color;
  view: [number, number];
  userRegistrationData = [
    {
      name: "User Registrations",
      series: [
        { name: new Date('2025-03-20'), value: 28 },
        { name: new Date('2025-03-21'), value: 37 },
        { name: new Date('2025-03-22'), value: 45 },
        { name: new Date('2025-03-23'), value: 52 },
        { name: new Date('2025-03-24'), value: 61 },
        { name: new Date('2025-03-25'), value: 73 },
        { name: new Date('2025-03-26'), value: 85 },
        { name: new Date('2025-03-27'), value: 96 }
      ]
    }
  ];

  constructor() {
    this.colorScheme = {
      name: 'customScheme',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
    };
    this.view = [window.innerWidth * 0.63, 400];
    this.isLoaded = true;
  }
}
