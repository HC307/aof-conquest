import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Campaign} from '../../model/campaign.interface';

export const campaignAdapter: EntityAdapter<Campaign> =
  createEntityAdapter<Campaign>();
