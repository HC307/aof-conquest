import { BaseEntity } from './base-entity.interface';
import { Rarity } from './rarity.enum';

export interface Trophy extends BaseEntity {
  rarity: Rarity;
}
