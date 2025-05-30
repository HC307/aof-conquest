import { EntityState } from '@ngrx/entity';
import { Construction } from '../../model/construction.interface';

export type ConstructionEntityState = EntityState<Construction> & {
  ids: string[];
};

export interface ConstructionState extends EntityState<Construction> {}
