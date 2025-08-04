import { createReducer, on } from '@ngrx/store';
import { TrophyState } from './trophy.state';
import { trophyAdapter } from './trophyAdapter';
import { TrophyCollection } from '../../data/trophies/trophy.collection';
import { trophyActions } from './trophy.actions';

export const initialTrophyState: TrophyState = trophyAdapter.getInitialState({
  entities: TrophyCollection.entities,
  ids: TrophyCollection.ids,
  count: TrophyCollection.ids.length,
});

export const trophyEntitiesReducer = createReducer(
  initialTrophyState,
  on(trophyActions.add, (state, { trophy }) => 
    trophyAdapter.addOne(trophy, state)
  ),
  on(trophyActions.update, (state, { trophy }) => 
    trophyAdapter.updateOne({ id: trophy.id!, changes: trophy }, state)
  ),
  on(trophyActions.remove, (state, { id }) => 
    trophyAdapter.removeOne(id, state)
  )
);
