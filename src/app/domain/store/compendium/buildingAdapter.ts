import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Building} from '../../model/building.type';

export const buildingAdapter: EntityAdapter<Building> = createEntityAdapter<Building>();
