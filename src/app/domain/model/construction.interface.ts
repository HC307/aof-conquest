import { Price } from './price.interface';
import { BaseEntity } from './base-entity.interface';

export interface Construction extends BaseEntity {
  constructionCost: Price;
  tiles: string[];
}
