import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseEntity } from '../../domain/model/base-entity.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-entity-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TextFieldComponent, PanelComponent],
  template: `
    <div class="dialog-overlay" (click)="onCancel()">
      <app-panel class="dialog-content" (click)="$event.stopPropagation()">
        <h2>{{ title }}</h2>
        
        <div class="form-fields">
          <app-text-field
            label="Name"
            [(ngModel)]="entity.name"
            [required]="true"
            placeholder="Enter name..."
          ></app-text-field>
          
          <div class="description-field">
            <label>Description</label>
            <textarea
              [(ngModel)]="entity.description"
              placeholder="Enter description..."
              rows="4"
            ></textarea>
          </div>
          
          <div class="flavour-field">
            <label>Flavour Text</label>
            <textarea
              [(ngModel)]="entity.flavour"
              placeholder="Enter flavour text..."
              rows="3"
            ></textarea>
          </div>
          
          <ng-content></ng-content>
        </div>
        
        <div class="dialog-actions">
          <app-button (click)="onCancel()">Cancel</app-button>
          <app-button [disabled]="!isValid()" (click)="onSave()">Save</app-button>
        </div>
      </app-panel>
    </div>
  `,
  styleUrls: ['./entity-form-dialog.component.scss']
})
export class EntityFormDialogComponent<T extends BaseEntity> {
  @Input() title = 'New Entity';
  @Input() entity: Partial<T> = {};
  @Output() save = new EventEmitter<Partial<T>>();
  @Output() cancel = new EventEmitter<void>();
  
  isValid(): boolean {
    return !!this.entity.name?.trim();
  }
  
  onSave(): void {
    if (this.isValid()) {
      this.save.emit(this.entity);
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
}