import { createReducer } from '@ngrx/store';
import { randomEncounterAdapter } from './randomEncounterAdapter';
import {RandomEncounterState} from './random-encounter.state';
import {RandomEncountersCollection} from '../../data/random-encounters/random-encounters.collection';

export const initialRandomEncounterState: RandomEncounterState =
  randomEncounterAdapter.getInitialState({
    entities: RandomEncountersCollection.entities,
    ids: RandomEncountersCollection.ids,
    count: RandomEncountersCollection.ids.length,
  });

export const randomEncounterEntitiesReducer = createReducer(
  initialRandomEncounterState
);
