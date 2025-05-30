import { createSelector } from '@ngrx/store';
import { tileFeatureAdapter } from './tile-featureAdapter';
import { AppState } from '../app.state';

export class TileFeatureEntitiesSelectors {
  private static adapterSelectors = tileFeatureAdapter.getSelectors();

  private static select = {
    tileFeatureEntities: (state: AppState) => state.tileFeatures,
  };

  public static all = createSelector(
    this.select.tileFeatureEntities,
    this.adapterSelectors.selectAll
  );

  public static byId = (itemId: string) =>
    createSelector(this.all, (itemList) =>
      itemList.find((item) => {
        return item.id === itemId;
      })
    );

  public static byName = (itemName: string) =>
    createSelector(this.all, (itemList) =>
      itemList.find((item) => {
        return item.name === itemName;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}
