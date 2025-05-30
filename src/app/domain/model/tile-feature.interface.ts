import { BaseEntity } from './base-entity.interface';
import { Rarity } from './rarity.enum';
import { TileType } from './tileType';

export interface TileFeature extends BaseEntity {
  rarity: Rarity;
  tiles: TileType[];
}
