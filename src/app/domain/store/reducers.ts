import {AppState} from './app.state';
import {ActionReducerMap} from '@ngrx/store';
import {generatorsReducer, initialGeneratorsState} from '../../features/generators/state/generators.reducers';
import {buildingEntitiesReducer, initialBuildingState} from './compendium/building-entities.reducers';

export const initialAppState: AppState = {
  generators: initialGeneratorsState,
  buildings: initialBuildingState,
};

export const reducers: ActionReducerMap<AppState> = {
  generators: generatorsReducer,
  buildings: buildingEntitiesReducer,
};
