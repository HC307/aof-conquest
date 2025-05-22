import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BuildingEntitiesSelectors} from '../../../domain/store/compendium/building.selectors';
import {AppState} from '../../../domain/store/app.state';
import {Store} from '@ngrx/store';
import {Building} from '../../../domain/model/building.type';
import {BuildingDisplayComponent} from '../../../components/building-display/building-display.component';

@Component({
  standalone: true,
  selector: 'app-buildings-compendium',
  imports: [
    BuildingDisplayComponent
  ],
  templateUrl: './buildings-compendium.component.html',
  styleUrl: './buildings-compendium.component.scss'
})
export class BuildingsCompendiumComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected buildings?: Building[];

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.store.select(BuildingEntitiesSelectors.all).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(entities => {
      this.buildings = entities;
    });
  }
}
