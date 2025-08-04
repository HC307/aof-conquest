import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseEntity } from '../../domain/model/base-entity.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TextFieldComponent, PanelComponent],
  template: `
    <app-panel class="entity-form">
      <h2>New {{ entityName }}</h2>
      
      <div class="form-fields">
        <app-text-field
          label="Name"
          [(ngModel)]="formData.name"
          [required]="true"
          placeholder="Enter name..."
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
        
        <ng-content></ng-content>
      </div>
      
      <div class="form-actions">
        <app-button (click)="onCancel()">Cancel</app-button>
        <app-button [disabled]="!isValid()" (click)="onSave()">Save</app-button>
      </div>
    </app-panel>
  `,
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent<T extends BaseEntity> {
  @Input() entityName = 'Entity';
  @Input() initialData: Partial<T> = {};
  @Output() save = new EventEmitter<Partial<T>>();
  @Output() cancel = new EventEmitter<void>();
  
  formData: Partial<T> = {};
  
  ngOnInit() {
    this.formData = { ...this.initialData };
  }
  
  isValid(): boolean {
    return !!this.formData.name?.trim();
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