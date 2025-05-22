import {Component, Input} from '@angular/core';
import {Building} from '../../domain/model/building.type';
import {PanelComponent} from '../panel/panel.component';

@Component({
  selector: 'app-building-display',
  imports: [
    PanelComponent
  ],
  templateUrl: './building-display.component.html',
  styleUrl: './building-display.component.scss'
})
export class BuildingDisplayComponent {
  @Input() data?: Building;
}
