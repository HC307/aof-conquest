import { AppState } from './app.state';
import { ActionReducerMap } from '@ngrx/store';
import {
  generatorsReducer,
  initialGeneratorsState,
} from '../../features/generators/state/generators.reducers';
import {
  constructionEntitiesReducer,
  initialConstructionState,
} from './constructions/construction-entities.reducers';
import {
  initialTileState,
  tileEntitiesReducer,
} from './tiles/tile-entities.reducers';
import {
  initialTrophyState,
  trophyEntitiesReducer,
} from './trophies/trophy-entities.reducers';
import {
  initialRuleState,
  ruleEntitiesReducer,
} from './rules/rules-entities.reducers';
import {
  initialTileFeatureState,
  tileFeatureEntitiesReducer,
} from './tile-features/tile-feature-entities.reducers';

export const initialAppState: AppState = {
  generators: initialGeneratorsState,
  constructions: initialConstructionState,
  tiles: initialTileState,
  trophies: initialTrophyState,
  rules: initialRuleState,
  tileFeatures: initialTileFeatureState,
};

export const reducers: ActionReducerMap<AppState> = {
  generators: generatorsReducer,
  constructions: constructionEntitiesReducer,
  tiles: tileEntitiesReducer,
  trophies: trophyEntitiesReducer,
  rules: ruleEntitiesReducer,
  tileFeatures: tileFeatureEntitiesReducer,
};
