import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../domain/store/app.state';
import { RandomEncounter } from '../../../domain/model/random-encounter.interface';
import { RandomEncounterEntitiesSelectors } from '../../../domain/store/random-encounter/random-encounter.selectors';
import { RandomEncounterDisplayComponent } from '../../../components/random-encounter-display/random-encounter-display.component';
import { GenericCompendiumComponent } from '../../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../../components/generic-compendium/generic-compendium.config';
import { randomEncounterActions } from '../../../domain/store/random-encounter/random-encounter.actions';

@Component({
  selector: 'app-random-encounter-compendium',
  standalone: true,
  imports: [GenericCompendiumComponent],
  template: `
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './random-encounter-compendium.component.scss'
})
export class RandomEncounterCompendiumComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<RandomEncounter> = {
    title: 'Random Encounters',
    entityName: 'random encounter',
    displayComponent: RandomEncounterDisplayComponent,
    selector: (filter: string) => this.store.select(RandomEncounterEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a random encounter.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: ''
    }),
    onAdd: (randomEncounter: RandomEncounter) => {
      this.store.dispatch(randomEncounterActions.add({ randomEncounter }));
    }
  };
}
