import { Component, Input } from '@angular/core';
import { Trophy } from '../../domain/model/trophy.interface';
import { PanelComponent } from '../panel/panel.component';
import { RarityDisplayComponent } from '../rarity-display/rarity-display.component';

@Component({
  selector: 'app-trophy-display',
  imports: [PanelComponent, RarityDisplayComponent],
  templateUrl: './trophy-display.component.html',
  styleUrl: './trophy-display.component.scss',
})
export class TrophyDisplayComponent {
  @Input() data?: Trophy;
}
