import { trophyAdapter } from './trophyAdapter';
import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export class TrophyEntitiesSelectors {
  private static adapterSelectors = trophyAdapter.getSelectors();

  private static select = {
    trophyEntities: (state: AppState) => state.trophies,
  };

  public static all = createSelector(
    this.select.trophyEntities,
    this.adapterSelectors.selectAll
  );

  public static byId = (trophyId: string) =>
    createSelector(this.all, (trophyList) =>
      trophyList.find((trophy) => {
        return trophy.id === trophyId;
      })
    );

  public static byName = (trophyName: string) =>
    createSelector(this.all, (trophyList) =>
      trophyList.find((trophy) => {
        return trophy.name === trophyName;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}
