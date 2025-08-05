import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Chronicle } from '../../model/chronicle.interface';

export const chronicleActions = {
  add: createAction('[Chronicle] Add Chronicle', props<{ chronicle: Chronicle }>()),
  update: createAction('[Chronicle] Update Chronicle', props<{ chronicle: Partial<Chronicle> & { id: string } }>()),
  remove: createAction('[Chronicle] Remove Chronicle', props<{ id: string }>()),
  removeAllCustom: createAction('[Chronicle] Remove All Custom Chronicles'),
};

// Entity-style actions for compatibility
export const chronicleEntityActions = {
  addChronicle: createAction('[Chronicle] Add Chronicle', props<{ chronicle: Chronicle }>()),
  addChronicles: createAction('[Chronicle] Add Chronicles', props<{ chronicles: Chronicle[] }>()),
  updateChronicle: createAction('[Chronicle] Update Chronicle', props<{ update: Update<Chronicle> }>()),
  removeChronicle: createAction('[Chronicle] Remove Chronicle', props<{ id: string }>()),
  clearChronicles: createAction('[Chronicle] Clear Chronicles'),
  setChronicles: createAction('[Chronicle] Set Chronicles', props<{ chronicles: Chronicle[] }>()),
};