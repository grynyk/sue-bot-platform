import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { InlineLoadingSpinnerComponent } from '../../../../shared';

@Component({
  standalone: true,
  selector: 'sue-broadcast-message-widget',
  styleUrls: ['broadcast-message.component.scss'],
  templateUrl: 'broadcast-message.component.html',
  imports: [CommonModule, RouterModule, MatIconModule, InlineLoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastMessageWidgetComponent {}
