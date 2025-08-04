import { createReducer, on } from '@ngrx/store';
import { randomEncounterAdapter } from './randomEncounterAdapter';
import {RandomEncounterState} from './random-encounter.state';
import {RandomEncountersCollection} from '../../data/random-encounters/random-encounters.collection';
import { randomEncounterActions } from './random-encounter.actions';

export const initialRandomEncounterState: RandomEncounterState =
  randomEncounterAdapter.getInitialState({
    entities: RandomEncountersCollection.entities,
    ids: RandomEncountersCollection.ids,
    count: RandomEncountersCollection.ids.length,
  });

export const randomEncounterEntitiesReducer = createReducer(
  initialRandomEncounterState,
  on(randomEncounterActions.add, (state, { randomEncounter }) => 
    randomEncounterAdapter.addOne(randomEncounter, state)
  ),
  on(randomEncounterActions.update, (state, { randomEncounter }) => 
    randomEncounterAdapter.updateOne({ id: randomEncounter.id!, changes: randomEncounter }, state)
  ),
  on(randomEncounterActions.remove, (state, { id }) => 
    randomEncounterAdapter.removeOne(id, state)
  ),
  on(randomEncounterActions.removeAllCustom, (state) => {
    const defaultIds = RandomEncountersCollection.ids;
    const idsToRemove = state.ids.filter(id => !defaultIds.includes(id as string)) as string[];
    return randomEncounterAdapter.removeMany(idsToRemove, state);
  })
);
