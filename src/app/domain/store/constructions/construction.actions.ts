import { createAction, props } from '@ngrx/store';
import { Construction } from '../../model/construction.interface';

export const constructionActions = {
  add: createAction('[Construction] Add Construction', props<{ construction: Construction }>()),
  update: createAction('[Construction] Update Construction', props<{ construction: Partial<Construction> & { id: string } }>()),
  remove: createAction('[Construction] Remove Construction', props<{ id: string }>()),
  removeAllCustom: createAction('[Construction] Remove All Custom Constructions'),
};