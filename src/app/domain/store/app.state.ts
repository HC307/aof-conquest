import {GeneratorsState} from '../../features/generators/state/generators.state';
import {BuildingState} from './compendium/buildings/building.state';
import {TileState} from './compendium/tiles/tile.state';
import {TrophyState} from './compendium/trophies/trophy.state';

export interface AppState {
  generators: GeneratorsState,
  buildings: BuildingState,
  tiles: TileState,
  trophies: TrophyState,
}
