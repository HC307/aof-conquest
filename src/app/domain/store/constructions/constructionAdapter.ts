import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Construction} from '../../model/construction.interface';

export const constructionAdapter: EntityAdapter<Construction> =
  createEntityAdapter<Construction>();
