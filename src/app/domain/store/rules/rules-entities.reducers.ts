import { createReducer, on } from '@ngrx/store';
import { ruleAdapter } from './rulesAdapter';
import { RuleCollection } from '../../data/rules/rules.collection';
import { RuleState } from './rules.state';
import { ruleActions } from './rules.actions';

export const initialRuleState: RuleState = ruleAdapter.getInitialState({
  entities: RuleCollection.entities,
  ids: RuleCollection.ids,
});

export const ruleEntitiesReducer = createReducer(
  initialRuleState,
  on(ruleActions.add, (state, { rule }) => 
    ruleAdapter.addOne(rule, state)
  ),
  on(ruleActions.update, (state, { rule }) => 
    ruleAdapter.updateOne({ id: rule.id!, changes: rule }, state)
  ),
  on(ruleActions.remove, (state, { id }) => 
    ruleAdapter.removeOne(id, state)
  )
);
