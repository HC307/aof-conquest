import { createAction, props } from '@ngrx/store';
import { BaseEntity } from '../model/base-entity.interface';

// Generic entity actions that can be used by all entity types
export const entityActions = {
  add: <T extends BaseEntity>(source: string) => 
    createAction(`[${source}] Add Entity`, props<{ entity: T }>()),
  
  update: <T extends BaseEntity>(source: string) => 
    createAction(`[${source}] Update Entity`, props<{ entity: T }>()),
  
  remove: (source: string) => 
    createAction(`[${source}] Remove Entity`, props<{ id: string }>()),
};