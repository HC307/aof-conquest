import { GeneratorsState } from '../../features/generators/state/generators.state';
import { ConstructionState as ConstructionState } from './constructions/construction.state';
import { TileState } from './tiles/tile.state';
import { TrophyState } from './trophies/trophy.state';
import { RuleState } from './rules/rules.state';
import { TileFeatureState } from './tile-features/tile-feature.state';

export interface AppState {
  generators: GeneratorsState;
  constructions: ConstructionState;
  tiles: TileState;
  tileFeatures: TileFeatureState;
  trophies: TrophyState;
  rules: RuleState;
}
