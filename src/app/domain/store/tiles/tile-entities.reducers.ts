import { createReducer, on } from '@ngrx/store';
import { tileAdapter } from './tileAdapter';
import { TileState } from './tile.state';
import { TileCollection } from '../../data/tiles/tiles.collection';
import { tileActions } from './tile.actions';

export const initialTileState: TileState = tileAdapter.getInitialState({
  entities: TileCollection.entities,
  ids: TileCollection.ids,
});

export const tileEntitiesReducer = createReducer(
  initialTileState,
  on(tileActions.add, (state, { tile }) => 
    tileAdapter.addOne(tile, state)
  ),
  on(tileActions.update, (state, { tile }) => 
    tileAdapter.updateOne({ id: tile.id!, changes: tile }, state)
  ),
  on(tileActions.remove, (state, { id }) => 
    tileAdapter.removeOne(id, state)
  ),
  on(tileActions.removeAllCustom, (state) => {
    // Keep only the default tiles from TileCollection
    const defaultIds = TileCollection.ids;
    const idsToRemove = state.ids.filter(id => !defaultIds.includes(id as string)) as string[];
    return tileAdapter.removeMany(idsToRemove, state);
  })
);
