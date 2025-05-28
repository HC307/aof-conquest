import {TilePrompt} from '../../model/tile-prompt.interface';
import {TileType} from '../../model/tileType';

export const TileBuildingPrompts: TilePrompt[] = [
  {
    prompt: 'You find an abandoned shack. Add 5pts to your funds.',
    tiles: [TileType.ANY],
  },
];
