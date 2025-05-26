import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AppState} from '../../../domain/store/app.state';
import {Store} from '@ngrx/store';
import {BehaviorSubject, switchMap} from 'rxjs';
import {TileEntitiesSelectors} from '../../../domain/store/compendium/tiles/tile.selectors';
import {Tile} from '../../../domain/model/type.type';
import {TextFieldComponent} from '../../../components/text-field/text-field.component';
import {ButtonComponent} from '../../../components/button/button.component';
import {TileDisplayComponent} from '../../../components/tile-display/tile-display.component';

@Component({
  standalone: true,
  selector: 'app-tiles-compendium',
  imports: [
    TextFieldComponent,
    ButtonComponent,
    TileDisplayComponent
  ],
  templateUrl: './tile-compendium.component.html',
  styleUrl: './tile-compendium.component.scss'
})
export class TileCompendiumComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  protected tiles?: Tile[];
  protected selectedtile?: Tile;
  filter$ = new BehaviorSubject<string>('');

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.filter$.pipe(
      switchMap(filter =>
        this.store.select(TileEntitiesSelectors.filtered(filter))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(entities => {
      this.tiles = entities;

      //Remove active tile if its not in the filtered list
      if (this.selectedtile && !this.tiles.includes(this.selectedtile)) {
        this.selectedtile = undefined;
      }

      //if theres only one result, set it active
      if (this.tiles.length == 1) {
        this.selectedtile = this.tiles[0];
      }
    });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
    console.log(newFilter);
  }
}
