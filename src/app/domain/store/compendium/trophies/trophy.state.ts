import {EntityState} from '@ngrx/entity';
import {Trophy} from '../../../model/trophy.interface';

export type TrophyEntityState = EntityState<Trophy> & { ids: string[] };

export interface TrophyState extends EntityState<Trophy> {
}
