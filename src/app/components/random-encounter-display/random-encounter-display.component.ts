import { Component, Input } from '@angular/core';
import {RandomEncounter} from '../../domain/model/random-encounter.interface';
import {PanelComponent} from '../panel/panel.component';
import {LootDisplayComponent} from '../loot-display/loot-display.component';

@Component({
  selector: 'app-random-encounter-display',
  imports: [
    PanelComponent,
    LootDisplayComponent
  ],
  templateUrl: './random-encounter-display.component.html',
  styleUrl: './random-encounter-display.component.scss'
})
export class RandomEncounterDisplayComponent {
  @Input() data?: RandomEncounter;
}
