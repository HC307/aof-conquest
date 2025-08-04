import { BaseEntity } from './base-entity.interface';
import { Loot } from './loot';
import { Army } from './faction.enum';

export interface RandomEncounter extends BaseEntity {
  points: number;
  roster: string[];
  reward?: Loot;
  faction: Army;
}
