import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Construction } from '../../../model/construction.type';

export const constructionAdapter: EntityAdapter<Construction> =
  createEntityAdapter<Construction>();
