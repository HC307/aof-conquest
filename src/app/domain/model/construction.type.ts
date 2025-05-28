import { Price } from './price.interface';
import { BaseEntity } from './base-entity.type';

export interface Construction extends BaseEntity {
  constructionCost: Price;
}
