import { TilePrompt } from '../../model/tile-prompt.interface';
import { TileType } from '../../model/tileType';

export const TileLootPrompts: TilePrompt[] = [
  {
    prompt: 'You find an abandoned shack. Add 5pts to your funds.',
    tiles: [TileType.ANY],
  },
  {
    prompt: 'You find an arcane artifact. Add it to your inventory.',
    tiles: [TileType.ANY],
  },
];
