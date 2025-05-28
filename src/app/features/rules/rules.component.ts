import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ToggleListInput } from '../../components/toggle-list/toggle-list.input';
import { AppState } from '../../domain/store/app.state';
import { Rule } from '../../domain/model/rule.interface';
import { ToggleListComponent } from '../../components/toggle-list/toggle-list.component';
import { RuleDisplayComponent } from '../../components/rule-display/rule-display.component';
import { RuleEntitiesSelectors } from '../../domain/store/rules/rules.selectors';

@Component({
  selector: 'app-rules',
  imports: [ToggleListComponent, RuleDisplayComponent],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected optionList?: Rule[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  filteredOptions(): ToggleListInput[] | undefined {
    if (!this.optionList) return undefined;

    return this.optionList.map((option) => ({
      id: option.id,
      display: option.name,
    }));
  }

  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap((filter) =>
          this.store.select(RuleEntitiesSelectors.filtered(filter))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((entities) => {
        this.optionList = entities;
      });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedOption() {
    return this.optionList?.find((option) => option.id === this.selectionId);
  }
}
