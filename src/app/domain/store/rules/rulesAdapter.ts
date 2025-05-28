import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Rule } from '../../model/rule.interface';

export const ruleAdapter: EntityAdapter<Rule> = createEntityAdapter<Rule>();
