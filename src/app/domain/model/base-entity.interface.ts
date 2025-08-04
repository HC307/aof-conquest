import { KeywordEnum } from './keyword.enum';

export interface BaseEntity {
  id: string;
  name: string;
  description?: string;
  keywords?: KeywordEnum[];
  flavour?: string;
  isUserCreated?: boolean;
}
