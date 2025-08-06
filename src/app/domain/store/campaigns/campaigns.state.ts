import {EntityState} from '@ngrx/entity';
import {Campaign} from '../../model/campaign.interface';

export type CampaignEntityState = EntityState<Campaign> & {
  ids: string[];
};

export interface CampaignState extends EntityState<Campaign> {
}
