import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BuildingEntitiesSelectors} from '../../../domain/store/compendium/buildings/building.selectors';
import {AppState} from '../../../domain/store/app.state';
import {Store} from '@ngrx/store';
import {Building} from '../../../domain/model/building.type';
import {BuildingDisplayComponent} from '../../../components/building-display/building-display.component';
import {BehaviorSubject, switchMap} from 'rxjs';
import {ToggleListComponent} from '../../../components/toggle-list/toggle-list.component';
import {ToggleListInput} from '../../../components/toggle-list/toggle-list.input';

@Component({
  selector: 'app-buildings-compendium',
  imports: [
    BuildingDisplayComponent,
    ToggleListComponent
  ],
  templateUrl: './buildings-compendium.component.html',
  styleUrl: './buildings-compendium.component.scss'
})
export class BuildingsCompendiumComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  protected buildings?: Building[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');

  constructor(
    private store: Store<AppState>,
  ) {
  }

  filteredBuildings(): ToggleListInput[] | undefined {
    if (!this.buildings) return undefined;

    return this.buildings.map(building => ({
      id: building.id,
      display: building.name
    }));
  }

  ngOnInit(): void {
    this.filter$.pipe(
      switchMap(filter =>
        this.store.select(BuildingEntitiesSelectors.filtered(filter))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(entities => {
      this.buildings = entities;
    });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  selectedBuilding() {
    return this.buildings?.find(building => building.id === this.selectionId);
  }
}
