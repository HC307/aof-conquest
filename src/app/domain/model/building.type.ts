import {Price} from './price.interface';
import {BaseEntity} from './base-entity.type';

export interface Building extends BaseEntity {
  buildingPrice: Price,
}
