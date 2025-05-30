import { Component, Input } from '@angular/core';
import { Tile } from '../../domain/model/tile.interface';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-tile-display',
  imports: [PanelComponent],
  templateUrl: './tile-display.component.html',
  styleUrl: './tile-display.component.scss',
})
export class TileDisplayComponent {
  @Input() data?: Tile;
}
