import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  standalone: true,
  selector: 'sue-inline-loading-spinner',
  templateUrl: './inline-loading-spinner.component.html',
  styleUrls: ['./inline-loading-spinner.component.scss'],
  imports: [CommonModule],
})
export class InlineLoadingSpinnerComponent {
  @Input() strokeWidth = 5;
  @Input() firstClipColor = '#888440';
  @Input() secondClipColor = '#d75f39';
  @Input() thirdClipColor = '#646973';
}
