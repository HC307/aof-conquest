import {TileLocationPrompts} from './tile-location.prompts';
import {TileBuildingPrompts} from './tile-building.prompts';
import {TileLootPrompts} from './tile-loot.prompts';
import {TileEncounterPrompts} from './tile-encounter.prompts';

export const TilePrompts = {
  empty: 'This land is barren and empty. You find nothing',
  locations: TileLocationPrompts,
  buildings: TileBuildingPrompts,
  loot: TileLootPrompts,
  encounters: TileEncounterPrompts,
};
