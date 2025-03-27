import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DynoService } from '../../services/dyno.service';
import { DynoStatus } from '../../models/heroku.model';

@Component({
  standalone: true,
  selector: 'sue-server-metrics-widget',
  styleUrls: ['server-metrics.component.scss'],
  templateUrl: 'server-metrics.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule
  ],
  providers: [DynoService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ServerMetricsWidgetComponent implements OnInit {
  notificationsToSend = 1235;
  notificationsSent = 800;

  dynoStatus: DynoStatus;
  isLoaded = false;
  constructor(private dynoService: DynoService) {}

  ngOnInit(): void {
    this.dynoService.getDynoStatus().subscribe((data: DynoStatus): void => {
      this.dynoStatus = data;
      this.isLoaded = true;
    });
  }

  getStatusColor(state: string): string {
    switch (state) {
      case 'up':
        return 'green';
      case 'down':
        return 'red';
      case 'maintenance':
        return 'yellow';
      default:
        return 'gray';
    }
  }
}
