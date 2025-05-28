import {TilePrompt} from '../../model/tile-prompt.interface';
import {TileType} from '../../model/tileType';

export const TileLocationPrompts: TilePrompt[] = [
  {
    prompt: 'This field is lush and green. Wild animals roam these lands. You can build a Mount Stable here.',
    tiles: [TileType.GRASSLANDS, TileType.HILLS],
  }, {
    prompt: 'This land if of old stone. Theres rich minerals in its earth. You can build a Quarry here.',
    tiles: [TileType.HILLS, TileType.MOUNTAIN],
  }
];
