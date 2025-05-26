import {createReducer} from '@ngrx/store';
import {BuildingState} from './building.state';
import {buildingAdapter} from './buildingAdapter';
import {BuildingCollection} from '../../../data/buildings/buildings.collection';

export const initialBuildingState: BuildingState = buildingAdapter.getInitialState({
  entities: BuildingCollection.entities,
  ids: BuildingCollection.ids,
  count: BuildingCollection.ids.length,
});

export const buildingEntitiesReducer = createReducer(
  initialBuildingState,
);
