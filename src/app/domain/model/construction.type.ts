import { Price } from './price.interface';
import { BaseEntity } from './base-entity.type';
import { Tile } from './tile.interface';
import { TileType } from './tileType';

export interface Construction extends BaseEntity {
  constructionCost: Price;
  tiles: TileType[];
}
