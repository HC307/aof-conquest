import {EntityState} from '@ngrx/entity';
import {Building} from '../../../model/building.type';

export type BuildingEntityState = EntityState<Building> & { ids: string[] };

export interface BuildingState extends EntityState<Building> {
}
