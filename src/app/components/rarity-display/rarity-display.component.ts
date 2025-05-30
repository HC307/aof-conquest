import { Component, Input } from '@angular/core';
import { Rarity } from '../../domain/model/rarity.enum';

@Component({
  selector: 'app-rarity-display',
  imports: [],
  templateUrl: './rarity-display.component.html',
  styleUrl: './rarity-display.component.scss',
})
export class RarityDisplayComponent {
  @Input() data?: Rarity;
}
