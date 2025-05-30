import { Component, DestroyRef, inject } from '@angular/core';
import { TileFeature } from '../../../domain/model/tile-feature.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AppState } from '../../../domain/store/app.state';
import { TileFeatureEntitiesSelectors } from '../../../domain/store/tile-features/tile-feature.selectors';
import { ToggleListComponent } from '../../../components/toggle-list/toggle-list.component';
import { TileFeatureDisplayComponent } from '../../../components/tile-feature-display/tile-feature-display.component';

@Component({
  selector: 'app-tile-features-compendium',
  imports: [ToggleListComponent, TileFeatureDisplayComponent],
  templateUrl: './tile-features-compendium.component.html',
  styleUrl: './tile-features-compendium.component.scss',
})
export class TileFeatureCompendiumComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected items?: TileFeature[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  filteredItems(): { id: string; display: string }[] | undefined {
    if (!this.items) return undefined;

    return this.items.map((item) => ({
      id: item.id,
      display: item.name,
    }));
  }

  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap((filter) =>
          this.store.select(TileFeatureEntitiesSelectors.filtered(filter))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((entities) => {
        this.items = entities;
      });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedItem(): TileFeature | undefined {
    return this.items?.find((tile) => tile.id === this.selectionId);
  }
}
