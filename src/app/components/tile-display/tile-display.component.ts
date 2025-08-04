import { Component, Input, inject, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Tile } from '../../domain/model/tile.interface';
import { PanelComponent } from '../panel/panel.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';
import { ButtonComponent } from '../button/button.component';
import { TileFormComponent } from '../tile-form/tile-form.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../domain/store/app.state';
import { tileActions } from '../../domain/store/tiles/tile.actions';
import { TileFeatureEntitiesSelectors } from '../../domain/store/tile-features/tile-feature.selectors';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tile-display',
  imports: [PanelComponent, UserCreatedIndicatorComponent, ButtonComponent, TileFormComponent, AsyncPipe],
  templateUrl: './tile-display.component.html',
  styleUrl: './tile-display.component.scss',
})
export class TileDisplayComponent implements OnChanges {
  @Input() data?: Tile;
  
  private readonly store = inject(Store<AppState>);
  private readonly cdr = inject(ChangeDetectorRef);
  isEditing = false;
  editData: Partial<Tile> = {};
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      // If data changed and we were editing, exit edit mode
      if (this.isEditing) {
        this.isEditing = false;
      }
      // Force change detection
      this.cdr.detectChanges();
    }
  }
  
  startEdit(): void {
    if (this.data) {
      this.editData = { ...this.data };
      this.isEditing = true;
    }
  }
  
  cancelEdit(): void {
    this.isEditing = false;
    this.editData = {};
  }
  
  saveEdit(updatedTile: Partial<Tile>): void {
    if (this.data) {
      // Merge the updates with the original data to preserve all properties
      const mergedTile = {
        ...this.data,
        ...updatedTile,
        id: this.data.id,
        isUserCreated: true 
      };
      this.store.dispatch(tileActions.update({ 
        tile: mergedTile
      }));
      this.isEditing = false;
      this.editData = {};
    }
  }
  
  deleteTile(): void {
    if (this.data && confirm('Are you sure you want to delete this tile?')) {
      this.store.dispatch(tileActions.remove({ id: this.data.id }));
    }
  }
  
  getFeatureName(featureId: string): Observable<string> {
    return this.store.select(TileFeatureEntitiesSelectors.byId(featureId)).pipe(
      map(feature => feature?.name || featureId)
    );
  }
}
