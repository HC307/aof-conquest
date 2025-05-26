import {TilePrompt} from '../../model/tile-prompt.type';
import {TileType} from '../../model/tileType';

export const TileEncounterPrompts: TilePrompt[] = [
  {
    prompt: 'Your are ambushed by a group of bandits. FIGHT!',
    tiles: [TileType.ANY],
  },
];
