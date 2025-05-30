import { TileType } from './tileType';
import { BaseEntity } from './base-entity.interface';

export interface Tile extends BaseEntity {
  type: TileType;
}
