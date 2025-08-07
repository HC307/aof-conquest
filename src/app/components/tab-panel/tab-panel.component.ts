import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-panel" [class.active]="active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-panel {
      display: none;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
    
    .tab-panel.active {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }
  `]
})
export class TabPanelComponent {
  @Input() tabId: string = '';
  @Input() active: boolean = false;
}