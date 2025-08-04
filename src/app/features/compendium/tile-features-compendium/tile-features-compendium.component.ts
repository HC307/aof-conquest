import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../domain/store/app.state';
import { TileFeature } from '../../../domain/model/tile-feature.interface';
import { TileFeatureEntitiesSelectors } from '../../../domain/store/tile-features/tile-feature.selectors';
import { TileFeatureDisplayComponent } from '../../../components/tile-feature-display/tile-feature-display.component';
import { GenericCompendiumComponent } from '../../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../../components/generic-compendium/generic-compendium.config';
import { tileFeatureActions } from '../../../domain/store/tile-features/tile-feature.actions';

@Component({
  selector: 'app-tile-features-compendium',
  standalone: true,
  imports: [GenericCompendiumComponent],
  template: `
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './tile-features-compendium.component.scss',
})
export class TileFeatureCompendiumComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<TileFeature> = {
    title: 'Tile Features',
    entityName: 'tile feature',
    displayComponent: TileFeatureDisplayComponent,
    selector: (filter: string) => this.store.select(TileFeatureEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a tile feature.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: ''
    }),
    onAdd: (tileFeature: TileFeature) => {
      this.store.dispatch(tileFeatureActions.add({ tileFeature }));
    }
  };
}
