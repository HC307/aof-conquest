import { BaseEntity } from './base-entity.type';
import { Rarity } from './rarity.enum';

export interface Trophy extends BaseEntity {
  rarity: Rarity;
}
