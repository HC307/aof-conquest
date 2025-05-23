import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BuildingEntitiesSelectors} from '../../../domain/store/compendium/building.selectors';
import {AppState} from '../../../domain/store/app.state';
import {Store} from '@ngrx/store';
import {Building} from '../../../domain/model/building.type';
import {BuildingDisplayComponent} from '../../../components/building-display/building-display.component';
import {ButtonComponent} from '../../../components/button/button.component';
import {TextFieldComponent} from '../../../components/text-field/text-field.component';
import {BehaviorSubject, switchMap} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-buildings-compendium',
  imports: [
    BuildingDisplayComponent,
    ButtonComponent,
    TextFieldComponent
  ],
  templateUrl: './buildings-compendium.component.html',
  styleUrl: './buildings-compendium.component.scss'
})
export class BuildingsCompendiumComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);

  protected buildings?: Building[];
  protected selectedBuilding?: Building;
  filter$ = new BehaviorSubject<string>('');

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.filter$.pipe(
      switchMap(filter =>
        this.store.select(BuildingEntitiesSelectors.filtered(filter))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(entities => {
      this.buildings = entities;

      //Remove active building if its not in the filtered list
      if (this.selectedBuilding && !this.buildings.includes(this.selectedBuilding)) {
        this.selectedBuilding = undefined;
      }

      //if theres only one result, set it active
      if (this.buildings.length == 1) {
        this.selectedBuilding = this.buildings[0];
      }
    });
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
    console.log(newFilter);
  }
}
