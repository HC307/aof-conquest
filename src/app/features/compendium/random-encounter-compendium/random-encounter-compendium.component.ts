import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ToggleListComponent} from '../../../components/toggle-list/toggle-list.component';
import {
  RandomEncounterDisplayComponent
} from '../../../components/random-encounter-display/random-encounter-display.component';
import {BehaviorSubject, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../domain/store/app.state';
import {ToggleListInput} from '../../../components/toggle-list/toggle-list.input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RandomEncounter} from '../../../domain/model/random-encounter.interface';
import {RandomEncounterEntitiesSelectors} from '../../../domain/store/random-encounter/random-encounter.selectors';

@Component({
  selector: 'app-random-encounter-compendium',
  imports: [
    ToggleListComponent,
    RandomEncounterDisplayComponent
  ],
  templateUrl: './random-encounter-compendium.component.html',
  styleUrl: './random-encounter-compendium.component.scss'
})
export class RandomEncounterCompendiumComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected options?: RandomEncounter[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {
  }

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
          this.store.select(RandomEncounterEntitiesSelectors.filtered(filter))
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
