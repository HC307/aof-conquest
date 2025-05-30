import { CurrencyEnum } from './currency.enum';
import { BaseEntity } from './base-entity.interface';

export interface Price {
  value: Number;
  currency: CurrencyEnum;
}
