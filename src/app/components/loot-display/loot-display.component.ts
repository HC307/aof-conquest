import { Component, Input } from '@angular/core';
import { Loot } from '../../domain/model/loot';
import {RarityDisplayComponent} from '../rarity-display/rarity-display.component';

@Component({
  selector: 'app-loot-display',
  imports: [
    RarityDisplayComponent
  ],
  templateUrl: './loot-display.component.html',
  styleUrl: './loot-display.component.scss'
})
export class LootDisplayComponent {
  @Input() data?: Loot;
}
