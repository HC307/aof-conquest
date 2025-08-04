import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConstructionEntitiesSelectors } from '../../../domain/store/constructions/construction.selectors';
import { AppState } from '../../../domain/store/app.state';
import { Construction } from '../../../domain/model/construction.interface';
import { ConstructionDisplayComponent } from '../../../components/construction-display/construction-display.component';
import { GenericCompendiumComponent } from '../../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../../components/generic-compendium/generic-compendium.config';
import { constructionActions } from '../../../domain/store/constructions/construction.actions';
import { CurrencyEnum } from '../../../domain/model/currency.enum';

@Component({
  selector: 'app-construction-compendium',
  standalone: true,
  imports: [GenericCompendiumComponent],
  template: `
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './construction-compendium.component.scss',
})
export class ConstructionCompendiumComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<Construction> = {
    title: 'Constructions',
    entityName: 'construction',
    displayComponent: ConstructionDisplayComponent,
    selector: (filter: string) => this.store.select(ConstructionEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a construct.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: '',
      constructionCost: { value: 1, currency: CurrencyEnum.Points },
      tiles: ['Grasslands']
    }),
    onAdd: (construction: Construction) => {
      this.store.dispatch(constructionActions.add({ construction }));
    }
  };
}
