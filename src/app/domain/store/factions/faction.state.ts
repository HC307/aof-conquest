import {EntityState} from '@ngrx/entity';
import {Faction} from '../../model/faction.interface';

export type FactionEntityState = EntityState<Faction> & {
  ids: string[];
};

export interface FactionState extends EntityState<Faction> {
}