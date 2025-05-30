import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppState } from '../../../domain/store/app.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap } from 'rxjs';
import { TileEntitiesSelectors } from '../../../domain/store/tiles/tile.selectors';
import { Tile } from '../../../domain/model/tile.interface';
import { TileDisplayComponent } from '../../../components/tile-display/tile-display.component';
import { ToggleListComponent } from '../../../components/toggle-list/toggle-list.component';

@Component({
  selector: 'app-tiles-compendium',
  imports: [TileDisplayComponent, ToggleListComponent],
  templateUrl: './tile-compendium.component.html',
  styleUrl: './tile-compendium.component.scss',
})
export class TileCompendiumComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  protected tiles?: Tile[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  filteredItems(): { id: string; display: string }[] | undefined {
    if (!this.tiles) return undefined;

    return this.tiles.map((tile) => ({
      id: tile.id,
      display: tile.name,
    }));
  }

  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap((filter) =>
          this.store.select(TileEntitiesSelectors.filtered(filter))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((entities) => {
        this.tiles = entities;
      });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedItem(): Tile | undefined {
    return this.tiles?.find((tile) => tile.id === this.selectionId);
  }
}
