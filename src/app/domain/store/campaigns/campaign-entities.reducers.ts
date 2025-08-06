import {createReducer, on} from '@ngrx/store';
import {campaignAdapter} from './campaignAdapter';
import {CampaignState} from './campaigns.state';
import {campaignEntityActions} from './campaign.actions';
import {Campaign} from '../../model/campaign.interface';

export const initialCampaignState: CampaignState =
  campaignAdapter.getInitialState();

export const campaignEntitiesReducer = createReducer(
  initialCampaignState,
  on(campaignEntityActions.addCampaign, (state, { campaign }) =>
    campaignAdapter.addOne(campaign, state)
  ),
  on(campaignEntityActions.addCampaigns, (state, { campaigns }) =>
    campaignAdapter.addMany(campaigns, state)
  ),
  on(campaignEntityActions.updateCampaign, (state, { update }) =>
    campaignAdapter.updateOne(update, state)
  ),
  on(campaignEntityActions.removeCampaign, (state, { id }) =>
    campaignAdapter.removeOne(id, state)
  ),
  on(campaignEntityActions.clearCampaigns, state =>
    campaignAdapter.removeAll(state)
  ),
  on(campaignEntityActions.setCampaigns, (state, { campaigns }) =>
    campaignAdapter.setAll(campaigns, state)
  )
);
