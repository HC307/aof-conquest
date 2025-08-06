import {campaignAdapter} from './campaignAdapter';
import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';


export class CampaignEntitiesSelectors {
  private static adapterSelectors = campaignAdapter.getSelectors();

  private static select = {
    entities: (state: AppState) => state.campaigns,
  };

  public static all = createSelector(
    this.select.entities,
    this.adapterSelectors.selectAll
  );

  public static byId = (entity: string) =>
    createSelector(this.all, (itemList) =>
      itemList.find((item) => {
        return item.id === entity;
      })
    );

  public static byName = (name: string) =>
    createSelector(this.all, (itemList) =>
      itemList.find((item) => {
        return item.name === name;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}

// Export convenient aliases
export const selectAllCampaigns = CampaignEntitiesSelectors.all;
export const selectCampaignById = (id: string) => CampaignEntitiesSelectors.byId(id);
