import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Campaign } from '../../model/campaign.interface';

export const campaignActions = {
  add: createAction('[Campaign] Add Campaign', props<{ campaign: Campaign }>()),
  update: createAction('[Campaign] Update Campaign', props<{ campaign: Partial<Campaign> & { id: string } }>()),
  remove: createAction('[Campaign] Remove Campaign', props<{ id: string }>()),
  removeAllCustom: createAction('[Campaign] Remove All Custom Campaigns'),
};

// Entity-style actions for compatibility
export const campaignEntityActions = {
  addCampaign: createAction('[Campaign] Add Campaign', props<{ campaign: Campaign }>()),
  addCampaigns: createAction('[Campaign] Add Campaigns', props<{ campaigns: Campaign[] }>()),
  updateCampaign: createAction('[Campaign] Update Campaign', props<{ update: Update<Campaign> }>()),
  removeCampaign: createAction('[Campaign] Remove Campaign', props<{ id: string }>()),
  clearCampaigns: createAction('[Campaign] Clear Campaigns'),
  setCampaigns: createAction('[Campaign] Set Campaigns', props<{ campaigns: Campaign[] }>()),
};
