import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Faction} from '../../model/faction.interface';

export const factionAdapter: EntityAdapter<Faction> =
  createEntityAdapter<Faction>();