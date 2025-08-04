import { BaseEntity } from './base-entity.interface';

export interface Tile extends BaseEntity {
  features?: string[]; // IDs of tile features that can appear on this tile
  isCustom?: boolean;
}
