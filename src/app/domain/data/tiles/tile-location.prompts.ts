import { TilePrompt } from '../../model/tile-prompt.interface';

export const TileLocationPrompts: TilePrompt[] = [
  {
    prompt:
      'This field is lush and green. Wild animals roam these lands. You can build a Mount Stable here.',
    tiles: ['Grasslands', 'Hills'],
  },
  {
    prompt:
      'This land if of old stone. Theres rich minerals in its earth. You can build a Quarry here.',
    tiles: ['Hills', 'Mountain'],
  },
];
