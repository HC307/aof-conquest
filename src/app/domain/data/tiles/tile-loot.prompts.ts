import { TilePrompt } from '../../model/tile-prompt.interface';

export const TileLootPrompts: TilePrompt[] = [
  {
    prompt: 'You find an abandoned shack. Add 5pts to your funds.',
    tiles: ['Any'],
  },
  {
    prompt: 'You find an arcane artifact. Add it to your inventory.',
    tiles: ['Any'],
  },
];
