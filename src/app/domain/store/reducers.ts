import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import {generatorsReducer, initialGeneratorsState,} from '../../features/generators/state/generators.reducers';
import {constructionEntitiesReducer, initialConstructionState,} from './constructions/construction-entities.reducers';
import {initialTileState, tileEntitiesReducer,} from './tiles/tile-entities.reducers';
import {initialTrophyState, trophyEntitiesReducer,} from './trophies/trophy-entities.reducers';
import {initialRuleState, ruleEntitiesReducer,} from './rules/rules-entities.reducers';
import {initialTileFeatureState, tileFeatureEntitiesReducer,} from './tile-features/tile-feature-entities.reducers';
import {
  initialRandomEncounterState,
  randomEncounterEntitiesReducer
} from './random-encounter/random-encounter-entities.reducers';
import {campaignEntitiesReducer, initialCampaignState} from './campaigns/campaign-entities.reducers';
import {factionEntitiesReducer, initialFactionState} from './factions/faction-entities.reducers';

export const initialAppState: AppState = {
  generators: initialGeneratorsState,
  constructions: initialConstructionState,
  tiles: initialTileState,
  trophies: initialTrophyState,
  rules: initialRuleState,
  tileFeatures: initialTileFeatureState,
  randomEncounters: initialRandomEncounterState,
  campaigns: initialCampaignState,
  factions: initialFactionState,
};

export const reducers: ActionReducerMap<AppState> = {
  generators: generatorsReducer,
  constructions: constructionEntitiesReducer,
  tiles: tileEntitiesReducer,
  trophies: trophyEntitiesReducer,
  rules: ruleEntitiesReducer,
  tileFeatures: tileFeatureEntitiesReducer,
  randomEncounters: randomEncounterEntitiesReducer,
  campaigns: campaignEntitiesReducer,
  factions: factionEntitiesReducer,
};
