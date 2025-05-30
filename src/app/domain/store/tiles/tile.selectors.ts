import { tileAdapter } from './tileAdapter';
import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export class TileEntitiesSelectors {
  private static adapterSelectors = tileAdapter.getSelectors();

  private static select = {
    tileEntities: (state: AppState) => state.tiles,
  };

  public static all = createSelector(
    this.select.tileEntities,
    this.adapterSelectors.selectAll
  );

  public static byId = (tileId: string) =>
    createSelector(this.all, (tileList) =>
      tileList.find((tile) => {
        return tile.id === tileId;
      })
    );

  public static byName = (tileName: string) =>
    createSelector(this.all, (tileList) =>
      tileList.find((tile) => {
        return tile.name === tileName;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}
