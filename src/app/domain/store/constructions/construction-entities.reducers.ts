import { createReducer, on } from '@ngrx/store';
import { ConstructionState as ConstructionState } from './construction.state';
import { constructionAdapter } from './constructionAdapter';
import { ConstructionCollection as ConstructionCollection } from '../../data/constructions/constructions.collection';
import { constructionActions } from './construction.actions';

export const initialConstructionState: ConstructionState =
  constructionAdapter.getInitialState({
    entities: ConstructionCollection.entities,
    ids: ConstructionCollection.ids,
    count: ConstructionCollection.ids.length,
  });

export const constructionEntitiesReducer = createReducer(
  initialConstructionState,
  on(constructionActions.add, (state, { construction }) => 
    constructionAdapter.addOne(construction, state)
  ),
  on(constructionActions.update, (state, { construction }) => 
    constructionAdapter.updateOne({ id: construction.id!, changes: construction }, state)
  ),
  on(constructionActions.remove, (state, { id }) => 
    constructionAdapter.removeOne(id, state)
  )
);
