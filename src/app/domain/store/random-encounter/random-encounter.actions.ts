import { createAction, props } from '@ngrx/store';
import { RandomEncounter } from '../../model/random-encounter.interface';

export const randomEncounterActions = {
  add: createAction('[RandomEncounter] Add Random Encounter', props<{ randomEncounter: RandomEncounter }>()),
  update: createAction('[RandomEncounter] Update Random Encounter', props<{ randomEncounter: Partial<RandomEncounter> & { id: string } }>()),
  remove: createAction('[RandomEncounter] Remove Random Encounter', props<{ id: string }>()),
  removeAllCustom: createAction('[RandomEncounter] Remove All Custom Random Encounters'),
};