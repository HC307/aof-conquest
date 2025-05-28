import { createSelector } from '@ngrx/store';
import { ruleAdapter } from './rulesAdapter';
import { AppState } from '../app.state';

export class RuleEntitiesSelectors {
  private static adapterSelectors = ruleAdapter.getSelectors();

  private static select = {
    ruleEntities: (state: AppState) => state.rules,
  };

  public static all = createSelector(
    this.select.ruleEntities,
    this.adapterSelectors.selectAll
  );

  public static byId = (ruleId: string) =>
    createSelector(this.all, (ruleList) =>
      ruleList.find((rule) => {
        return rule.id === ruleId;
      })
    );

  public static byName = (ruleName: string) =>
    createSelector(this.all, (ruleList) =>
      ruleList.find((rule) => {
        return rule.name === ruleName;
      })
    );

  public static filtered = (filter: string) =>
    createSelector(this.all, (filteredList) =>
      filteredList.filter((value) => {
        return value.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
}
