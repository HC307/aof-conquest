import { createReducer } from '@ngrx/store';
import { ruleAdapter } from './rulesAdapter';
import { RuleCollection } from '../../data/rules/rules.collection';
import { RuleState } from './rules.state';

export const initialRuleState: RuleState = ruleAdapter.getInitialState({
  entities: RuleCollection.entities,
  ids: RuleCollection.ids,
  count: RuleCollection.ids.length,
});

export const ruleEntitiesReducer = createReducer(initialRuleState);
