import { GeneratorsState } from '../../features/generators/state/generators.state';
import { ConstructionState as ConstructionState } from './compendium/constructions/construction.state';
import { TileState } from './compendium/tiles/tile.state';
import { TrophyState } from './compendium/trophies/trophy.state';
import { RuleState } from './rules/rules.state';

export interface AppState {
  generators: GeneratorsState;
  constructions: ConstructionState;
  tiles: TileState;
  trophies: TrophyState;
  rules: RuleState;
}
