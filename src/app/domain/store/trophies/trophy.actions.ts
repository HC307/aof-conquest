import { createAction, props } from '@ngrx/store';
import { Trophy } from '../../model/trophy.interface';

export const trophyActions = {
  add: createAction('[Trophy] Add Trophy', props<{ trophy: Trophy }>()),
  update: createAction('[Trophy] Update Trophy', props<{ trophy: Partial<Trophy> & { id: string } }>()),
  remove: createAction('[Trophy] Remove Trophy', props<{ id: string }>()),
};