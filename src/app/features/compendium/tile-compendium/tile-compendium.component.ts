import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../domain/store/app.state';
import { TileEntitiesSelectors } from '../../../domain/store/tiles/tile.selectors';
import { TileDisplayComponent } from '../../../components/tile-display/tile-display.component';
import { GenericCompendiumComponent } from '../../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../../components/generic-compendium/generic-compendium.config';
import { Tile } from '../../../domain/model/tile.interface';
import { tileActions } from '../../../domain/store/tiles/tile.actions';
import { TileFormComponent } from '../../../components/tile-form/tile-form.component';

@Component({
  selector: 'app-tiles-compendium',
  standalone: true,
  imports: [GenericCompendiumComponent],
  template: `
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './tile-compendium.component.scss',
})
export class TileCompendiumComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<Tile> = {
    title: 'Tiles',
    entityName: 'tile',
    displayComponent: TileDisplayComponent,
    selector: (filter: string) => this.store.select(TileEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a tile.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: '',
      features: [], // Empty by default, user will select
      isCustom: true
    }),
    onAdd: (tile: Tile) => {
      this.store.dispatch(tileActions.add({ tile }));
    },
    formComponent: TileFormComponent
  };
}
