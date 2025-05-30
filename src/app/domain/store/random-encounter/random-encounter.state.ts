import {EntityState} from '@ngrx/entity';
import {RandomEncounter} from '../../model/random-encounter.interface';

export type RandomEncounterEntityState = EntityState<RandomEncounter> & {
  ids: string[];
};

export interface RandomEncounterState extends EntityState<RandomEncounter> {
}
