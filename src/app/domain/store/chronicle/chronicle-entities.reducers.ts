import { createReducer } from '@ngrx/store';
import { ConstructionState as ConstructionState } from './chronicle.state';
import { constructionAdapter } from './chronicleAdapter';
import { ConstructionCollection as ConstructionCollection } from '../../data/constructions/constructions.collection';

export const initialConstructionState: ConstructionState =
  constructionAdapter.getInitialState({
    entities: ConstructionCollection.entities,
    ids: ConstructionCollection.ids,
    count: ConstructionCollection.ids.length,
  });

export const constructionEntitiesReducer = createReducer(
  initialConstructionState
);
