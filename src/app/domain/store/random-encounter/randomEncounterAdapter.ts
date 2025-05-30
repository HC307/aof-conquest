import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {RandomEncounter} from '../../model/random-encounter.interface';

export const randomEncounterAdapter: EntityAdapter<RandomEncounter> =
  createEntityAdapter<RandomEncounter>();
