import {TilePrompt} from '../../model/tile-prompt.type';
import {TileType} from '../../model/tileType';

export const TileLootPrompts: TilePrompt[] = [
  {
    prompt: 'You find an arcane artifact. Add it to your inventory.',
    tiles: [TileType.ANY],
  },
];
