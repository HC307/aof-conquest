import { BaseEntity } from './base-entity.interface';
import { Rarity } from './rarity.enum';

export interface TileFeature extends BaseEntity {
  rarity: Rarity;
}
