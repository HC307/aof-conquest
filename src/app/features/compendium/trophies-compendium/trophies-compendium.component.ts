import {Component, DestroyRef, inject} from '@angular/core';
import {ToggleListComponent} from '../../../components/toggle-list/toggle-list.component';
import {TrophyDisplayComponent} from '../../../components/trophy-display/trophy-display.component';
import {Tile} from '../../../domain/model/tile.interface';
import {BehaviorSubject, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../domain/store/app.state';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TrophyEntitiesSelectors} from '../../../domain/store/compendium/trophies/trophy.selectors';
import {Trophy} from '../../../domain/model/trophy.interface';

@Component({
  selector: 'app-trophies-compendium',
  imports: [
    ToggleListComponent,
    TrophyDisplayComponent
  ],
  templateUrl: './trophies-compendium.component.html',
  styleUrl: './trophies-compendium.component.scss'
})
export class TrophiesCompendiumComponent {

  private readonly destroyRef = inject(DestroyRef);

  protected trophies?: Trophy[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(
    private store: Store<AppState>,
  ) {
  }

  filteredTrophies(): { id: string; display: string }[] | undefined {
    if (!this.trophies) return undefined;

    return this.trophies.map(obj => ({
      id: obj.id,
      display: obj.name
    }));
  }

  ngOnInit(): void {
    this.filter$.pipe(
      switchMap(filter =>
        this.store.select(TrophyEntitiesSelectors.filtered(filter))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(entities => {
      this.trophies = entities;
    });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedItem(): Trophy | undefined {
    return this.trophies?.find(tile => tile.id === this.selectionId);
  }
}
