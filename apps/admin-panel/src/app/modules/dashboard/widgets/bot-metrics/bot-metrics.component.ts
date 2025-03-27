import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ChartsModule } from '../../../../shared/charts/charts.module';

@Component({
  standalone: true,
  selector: 'sue-bot-metrics-widget',
  styleUrls: ['bot-metrics.component.scss'],
  templateUrl: 'bot-metrics.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ChartsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotMetricsWidgetComponent {
  data = [
    { name: "Users", value: 100 },
    { name: "asdasd", value: 1020 },
    { name: "bbbb", value: 120 },
    { name: "Active", value: 2 },
    { name: "Disabled Notifications", value: 21 },
    { name: "Blocked", value: 5 },
    { name: "Active", value: 2 },
    { name: "Disabled Notifications", value: 21 },
  ];

  getView(width: number, height = 400): [number, number] {
    return [window.innerWidth * width, height];
  }

  // Color Scheme
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#28a745', '#ffc107', '#dc3545']
  };
}
