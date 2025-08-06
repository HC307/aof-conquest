import {factionAdapter} from './factionAdapter';
import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';

export class FactionEntitiesSelectors {
  private static adapterSelectors = factionAdapter.getSelectors();

  private static select = {
    entities: (state: AppState) => state.factions,
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
export const selectAllFactions = FactionEntitiesSelectors.all;
export const selectFactionById = (id: string) => FactionEntitiesSelectors.byId(id);
export const selectFactionsByCampaignId = (campaignId: string) => 
  createSelector(selectAllFactions, (factions) => 
    factions.filter(faction => faction.campaignId === campaignId)
  );