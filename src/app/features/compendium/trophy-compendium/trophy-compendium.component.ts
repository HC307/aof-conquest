import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../domain/store/app.state';
import { TrophyEntitiesSelectors } from '../../../domain/store/trophies/trophy.selectors';
import { Trophy } from '../../../domain/model/trophy.interface';
import { TrophyDisplayComponent } from '../../../components/trophy-display/trophy-display.component';
import { GenericCompendiumComponent } from '../../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../../components/generic-compendium/generic-compendium.config';
import { trophyActions } from '../../../domain/store/trophies/trophy.actions';
import { Rarity } from '../../../domain/model/rarity.enum';

@Component({
  selector: 'app-trophy-compendium',
  standalone: true,
  imports: [GenericCompendiumComponent],
  template: `
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './trophy-compendium.component.scss',
})
export class TrophyCompendiumComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<Trophy> = {
    title: 'Trophies',
    entityName: 'trophy',
    displayComponent: TrophyDisplayComponent,
    selector: (filter: string) => this.store.select(TrophyEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a trophy.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: '',
      rarity: Rarity.Common
    }),
    onAdd: (trophy: Trophy) => {
      this.store.dispatch(trophyActions.add({ trophy }));
    }
  };
}
