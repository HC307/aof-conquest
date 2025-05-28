import {CurrencyEnum} from './currency.enum';
import {BaseEntity} from './base-entity.type';

export interface Price {
  value: Number,
  currency: CurrencyEnum,
}

