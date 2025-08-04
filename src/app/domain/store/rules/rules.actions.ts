import { createAction, props } from '@ngrx/store';
import { Rule } from '../../model/rule.interface';

export const ruleActions = {
  add: createAction('[Rule] Add Rule', props<{ rule: Rule }>()),
  update: createAction('[Rule] Update Rule', props<{ rule: Partial<Rule> & { id: string } }>()),
  remove: createAction('[Rule] Remove Rule', props<{ id: string }>()),
};