import { Component, Input } from '@angular/core';
import { Construction } from '../../domain/model/construction.type';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-construction-display',
  imports: [PanelComponent],
  templateUrl: './construction-display.component.html',
  styleUrl: './construction-display.component.scss',
})
export class ConstructionDisplayComponent {
  @Input() data?: Construction;
}
