import { EntityState } from '@ngrx/entity';
import { Chronicle } from '../../model/chronicler/chronicle.interface';

export type ChronicleEntityState = EntityState<Chronicle> & {
  ids: string[];
};

export interface ChronicleState extends EntityState<Chronicle> {}
