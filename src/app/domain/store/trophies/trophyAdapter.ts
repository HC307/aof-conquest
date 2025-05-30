import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Trophy } from '../../model/trophy.interface';

export const trophyAdapter: EntityAdapter<Trophy> =
  createEntityAdapter<Trophy>();
