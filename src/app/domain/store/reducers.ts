import { AppState } from './app.state';
import { ActionReducerMap } from '@ngrx/store';
import {
  generatorsReducer,
  initialGeneratorsState,
} from '../../features/generators/state/generators.reducers';
import {
  constructionEntitiesReducer,
  initialConstructionState,
} from './compendium/constructions/construction-entities.reducers';
import {
  initialTileState,
  tileEntitiesReducer,
} from './compendium/tiles/tile-entities.reducers';
import {
  initialTrophyState,
  trophyEntitiesReducer,
} from './compendium/trophies/trophy-entities.reducers';
import {
  initialRuleState,
  ruleEntitiesReducer,
} from './rules/rules-entities.reducers';

export const initialAppState: AppState = {
  generators: initialGeneratorsState,
  constructions: initialConstructionState,
  tiles: initialTileState,
  trophies: initialTrophyState,
  rules: initialRuleState,
};

export const reducers: ActionReducerMap<AppState> = {
  generators: generatorsReducer,
  constructions: constructionEntitiesReducer,
  tiles: tileEntitiesReducer,
  trophies: trophyEntitiesReducer,
  rules: ruleEntitiesReducer,
};
