import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from '../../domain/store/app.state';
import { Tile } from '../../domain/model/tile.interface';
import { TileFeature } from '../../domain/model/tile-feature.interface';
import { TileFeatureEntitiesSelectors } from '../../domain/store/tile-features/tile-feature.selectors';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { PanelComponent } from '../panel/panel.component';
import { MultiSelectComponent, SelectOption } from '../multi-select/multi-select.component';

@Component({
  selector: 'app-tile-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TextFieldComponent, PanelComponent, MultiSelectComponent],
  template: `
    <app-panel>
      <h2>{{ isEditing ? 'Edit' : 'New' }} Tile</h2>
      
      <div class="form-fields">
        <app-text-field
          label="Name"
          [(ngModel)]="formData.name"
          [required]="true"
          placeholder="Enter tile name (e.g., Forest, Desert)..."
        ></app-text-field>
        
        <div class="field-group">
          <label>Description</label>
          <textarea
            [(ngModel)]="formData.description"
            placeholder="Enter description..."
            rows="4"
            class="form-textarea"
          ></textarea>
        </div>
        
        <app-multi-select
          label="Available Features"
          [options]="(featureOptions$ | async) || []"
          [selectedIds]="formData.features || []"
          (selectionChange)="onFeatureSelectionChange($event)"
          placeholder="Select features..."
        ></app-multi-select>
      </div>
      
      <div class="form-actions">
        <app-button (click)="onCancel()">Cancel</app-button>
        <app-button [disabled]="!isValid()" (click)="onSave()">Save</app-button>
      </div>
    </app-panel>
  `,
  styleUrls: ['./tile-form.component.scss']
})
export class TileFormComponent implements OnInit {
  @Input() initialData: Partial<Tile> = {};
  @Input() isEditing = false;
  @Output() save = new EventEmitter<Partial<Tile>>();
  @Output() cancel = new EventEmitter<void>();
  
  private readonly store = inject(Store<AppState>);
  
  formData: Partial<Tile> = {};
  featureOptions$: Observable<SelectOption[]>;
  
  constructor() {
    this.featureOptions$ = this.store.select(TileFeatureEntitiesSelectors.all).pipe(
      map(features => features.map(feature => ({
        id: feature.id,
        label: feature.name,
        selected: false
      })))
    );
  }
  
  ngOnInit() {
    this.formData = { 
      ...this.initialData,
      features: this.initialData.features || []
    };
  }
  
  isValid(): boolean {
    return !!this.formData.name?.trim();
  }
  
  onFeatureSelectionChange(selectedIds: string[]): void {
    this.formData.features = selectedIds;
  }
  
  onSave(): void {
    if (this.isValid()) {
      this.save.emit(this.formData);
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
}