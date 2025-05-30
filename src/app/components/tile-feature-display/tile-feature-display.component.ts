import { Component, Input } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { RarityDisplayComponent } from '../rarity-display/rarity-display.component';
import { TileFeature } from '../../domain/model/tile-feature.interface';

@Component({
  selector: 'app-tile-feature-display',
  imports: [PanelComponent, RarityDisplayComponent],
  templateUrl: './tile-feature-display.component.html',
  styleUrl: './tile-feature-display.component.scss',
})
export class TileFeatureDisplayComponent {
  @Input() data?: TileFeature;
}
