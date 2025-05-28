import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import {generatorsReducer, initialGeneratorsState} from '../../features/generators/state/generators.reducers';
import {buildingEntitiesReducer, initialBuildingState} from './compendium/buildings/building-entities.reducers';
import {initialTileState, tileEntitiesReducer} from './compendium/tiles/tile-entities.reducers';
import {initialTrophyState, trophyEntitiesReducer} from './compendium/trophies/trophy-entities.reducers';

export const initialAppState: AppState = {
  generators: initialGeneratorsState,
  buildings: initialBuildingState,
  tiles: initialTileState,
  trophies: initialTrophyState,
};

export const reducers: ActionReducerMap<AppState> = {
  generators: generatorsReducer,
  buildings: buildingEntitiesReducer,
  tiles: tileEntitiesReducer,
  trophies: trophyEntitiesReducer,
};
