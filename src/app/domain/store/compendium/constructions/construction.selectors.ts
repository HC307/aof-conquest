import { constructionAdapter } from './constructionAdapter';
import { AppState } from '../../app.state';
import { createSelector } from '@ngrx/store';

export class ConstructionEntitiesSelectors {
  private static adapterSelectors = constructionAdapter.getSelectors();

  private static select = {
    buildingEntities: (state: AppState) => state.constructions,
  };

  public static all = createSelector(
    this.select.buildingEntities,
    this.adapterSelectors.selectAll
  );

  public static byId = (buildingId: string) =>
    createSelector(this.all, (buildingList) =>
      buildingList.find((building) => {
        return building.id === buildingId;
      })
    );

  public static byName = (buildingName: string) =>
    createSelector(this.all, (buildingList) =>
      buildingList.find((building) => {
        return building.name === buildingName;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}
