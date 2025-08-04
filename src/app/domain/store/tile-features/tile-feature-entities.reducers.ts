import { createReducer, on } from '@ngrx/store';
import { TileFeatureState } from './tile-feature.state';
import { tileFeatureAdapter } from './tile-featureAdapter';
import { TileFeatureCollection } from '../../data/tile-features/tile-feature.collection';
import { tileFeatureActions } from './tile-feature.actions';

export const initialTileFeatureState: TileFeatureState =
  tileFeatureAdapter.getInitialState({
    entities: TileFeatureCollection.entities,
    ids: TileFeatureCollection.ids,
    count: TileFeatureCollection.ids.length,
  });

export const tileFeatureEntitiesReducer = createReducer(
  initialTileFeatureState,
  on(tileFeatureActions.add, (state, { tileFeature }) => 
    tileFeatureAdapter.addOne(tileFeature, state)
  ),
  on(tileFeatureActions.update, (state, { tileFeature }) => 
    tileFeatureAdapter.updateOne({ id: tileFeature.id!, changes: tileFeature }, state)
  ),
  on(tileFeatureActions.remove, (state, { id }) => 
    tileFeatureAdapter.removeOne(id, state)
  ),
  on(tileFeatureActions.removeAllCustom, (state) => {
    const defaultIds = TileFeatureCollection.ids;
    const idsToRemove = state.ids.filter(id => !defaultIds.includes(id as string)) as string[];
    return tileFeatureAdapter.removeMany(idsToRemove, state);
  })
);
