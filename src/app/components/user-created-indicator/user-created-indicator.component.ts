import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-created-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isUserCreated) {
      <span class="user-created-indicator" [attr.data-tooltip]="tooltip">
        ⚠️
      </span>
    }
  `,
  styleUrls: ['./user-created-indicator.component.scss']
})
export class UserCreatedIndicatorComponent {
  @Input() isUserCreated = false;
  @Input() tooltip = 'User-created';
}