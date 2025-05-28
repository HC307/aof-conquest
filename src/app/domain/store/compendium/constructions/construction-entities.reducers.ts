import { createReducer } from '@ngrx/store';
import { ConstructionState as ConstructionState } from './construction.state';
import { constructionAdapter } from './constructionAdapter';
import { ConstructionCollection as ConstructionCollection } from '../../../data/constructions/constructions.collection';

export const initialConstructionState: ConstructionState =
  constructionAdapter.getInitialState({
    entities: ConstructionCollection.entities,
    ids: ConstructionCollection.ids,
    count: ConstructionCollection.ids.length,
  });

export const constructionEntitiesReducer = createReducer(
  initialConstructionState
);
