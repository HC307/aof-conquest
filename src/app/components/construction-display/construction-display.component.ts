import { Component, Input } from '@angular/core';
import { Construction } from '../../domain/model/construction.interface';
import { PanelComponent } from '../panel/panel.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';

@Component({
  selector: 'app-construction-display',
  imports: [PanelComponent, UserCreatedIndicatorComponent],
  templateUrl: './construction-display.component.html',
  styleUrl: './construction-display.component.scss',
})
export class ConstructionDisplayComponent {
  @Input() data?: Construction;
}
