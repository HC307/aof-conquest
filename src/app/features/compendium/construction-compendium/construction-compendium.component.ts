import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConstructionEntitiesSelectors } from '../../../domain/store/constructions/construction.selectors';
import { AppState } from '../../../domain/store/app.state';
import { Store } from '@ngrx/store';
import { Construction } from '../../../domain/model/construction.interface';
import { ConstructionDisplayComponent } from '../../../components/construction-display/construction-display.component';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ToggleListComponent } from '../../../components/toggle-list/toggle-list.component';
import { ToggleListInput } from '../../../components/toggle-list/toggle-list.input';

@Component({
  selector: 'app-construction-compendium',
  imports: [ToggleListComponent, ConstructionDisplayComponent],
  templateUrl: './construction-compendium.component.html',
  styleUrl: './construction-compendium.component.scss',
})
export class ConstructionCompendiumComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected options?: Construction[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  filteredOptions(): ToggleListInput[] | undefined {
    if (!this.options) return undefined;

    return this.options.map((option) => ({
      id: option.id,
      display: option.name,
    }));
  }

  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap((filter) =>
          this.store.select(ConstructionEntitiesSelectors.filtered(filter))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((entities) => {
        this.options = entities;
      });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedOption() {
    return this.options?.find((option) => option.id === this.selectionId);
  }
}
