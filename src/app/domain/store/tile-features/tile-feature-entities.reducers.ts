import { createReducer } from '@ngrx/store';
import { TileFeatureState } from './tile-feature.state';
import { tileFeatureAdapter } from './tile-featureAdapter';
import { TileFeatureCollection } from '../../data/tile-features/tile-feature.collection';

export const initialTileFeatureState: TileFeatureState =
  tileFeatureAdapter.getInitialState({
    entities: TileFeatureCollection.entities,
    ids: TileFeatureCollection.ids,
    count: TileFeatureCollection.ids.length,
  });

export const tileFeatureEntitiesReducer = createReducer(
  initialTileFeatureState
);
