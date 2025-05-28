import { EntityState } from '@ngrx/entity';
import { Rule } from '../../model/rule.interface';

export type RuleEntityState = EntityState<Rule> & { ids: string[] };

export interface RuleState extends EntityState<Rule> {}
