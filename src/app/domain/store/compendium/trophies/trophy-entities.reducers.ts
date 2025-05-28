import { createReducer } from '@ngrx/store';
import { TrophyState } from './trophy.state';
import { trophyAdapter } from './trophyAdapter';
import { TrophyCollection } from '../../../data/trophies/trophy.collection';

export const initialTrophyState: TrophyState = trophyAdapter.getInitialState({
  entities: TrophyCollection.entities,
  ids: TrophyCollection.ids,
  count: TrophyCollection.ids.length,
});

export const trophyEntitiesReducer = createReducer(initialTrophyState);
