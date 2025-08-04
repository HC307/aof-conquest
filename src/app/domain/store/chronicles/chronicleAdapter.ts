import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Chronicle} from '../../model/chronicle.interface';

export const chronicleAdapter: EntityAdapter<Chronicle> =
  createEntityAdapter<Chronicle>();
