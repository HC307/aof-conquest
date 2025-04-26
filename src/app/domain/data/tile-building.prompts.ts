import {TilePrompt} from '../model/tile-prompt.type';
import {TileType} from './tile.type';

export const TileBuildingPrompts: TilePrompt[] = [
  {
    prompt: 'You find an abandoned shack. Add 5pts to your funds.',
    tiles: [TileType.ANY],
  },
];
