import {createReducer} from '@ngrx/store';
import {tileAdapter} from './tileAdapter';
import {TileState} from './tile.state';
import {TileCollection} from '../../../data/tiles/tiles.collection';

export const initialTileState: TileState = tileAdapter.getInitialState({
  entities: TileCollection.entities,
  ids: TileCollection.ids,
  count: TileCollection.ids.length,
});

export const tileEntitiesReducer = createReducer(
  initialTileState,
);
