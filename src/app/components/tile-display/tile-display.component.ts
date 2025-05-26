import {Component, Input} from '@angular/core';
import {Tile} from '../../domain/model/type.type';

@Component({
  standalone: true,
  selector: 'app-tile-display',
  imports: [],
  templateUrl: './tile-display.component.html',
  styleUrl: './tile-display.component.scss'
})
export class TileDisplayComponent {
  @Input() data?: Tile;
}
