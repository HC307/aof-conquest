import {createReducer} from '@ngrx/store';
import {constructionAdapter} from '../constructions/constructionAdapter';
import {ChronicleState} from './chronicles.state';

export const initialChronicleState: ChronicleState =
  constructionAdapter.getInitialState({
    entities: [],
    ids: [],
    count: 0,
  });

export const chronicleEntitiesReducer = createReducer(
  initialChronicleState
);
