import {KeywordEnum} from './keyword.enum';

export type BaseEntity = {
  id: string;
  name: string;
  description?: string;
  keywords?: KeywordEnum[];
}

