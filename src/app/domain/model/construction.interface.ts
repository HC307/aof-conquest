import { Price } from './price.interface';
import { BaseEntity } from './base-entity.interface';
import { TileType } from './tileType';

export interface Construction extends BaseEntity {
  constructionCost: Price;
  tiles: TileType[];
}
