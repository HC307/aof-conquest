import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../domain/store/app.state';
import { Rule } from '../../domain/model/rule.interface';
import { RuleDisplayComponent } from '../../components/rule-display/rule-display.component';
import { RuleEntitiesSelectors } from '../../domain/store/rules/rules.selectors';
import { GenericCompendiumComponent } from '../../components/generic-compendium/generic-compendium.component';
import { CompendiumConfig } from '../../components/generic-compendium/generic-compendium.config';
import { ruleActions } from '../../domain/store/rules/rules.actions';

@Component({
  selector: 'app-rules',
  imports: [GenericCompendiumComponent],
  template: `
    <h2>Rules</h2>
    <app-generic-compendium [config]="compendiumConfig"></app-generic-compendium>
  `,
  styleUrl: './rules.component.scss',
})
export class RulesComponent {
  private readonly store = inject(Store<AppState>);

  compendiumConfig: CompendiumConfig<Rule> = {
    title: '',
    entityName: 'rule',
    displayComponent: RuleDisplayComponent,
    selector: (filter: string) => this.store.select(RuleEntitiesSelectors.filtered(filter)),
    emptyMessage: 'Select a rule.',
    canAdd: true,
    createNew: () => ({
      name: '',
      description: ''
    }),
    onAdd: (rule: Rule) => {
      this.store.dispatch(ruleActions.add({ rule }));
    }
  };
}
