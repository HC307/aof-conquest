import {TileType} from './tileType';
import {BaseEntity} from './base-entity.type';

export interface Tile extends BaseEntity {
  type: TileType,
}
