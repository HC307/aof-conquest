import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitAbility } from '../../domain/model/faction.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';

@Component({
  selector: 'app-ability-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    TextFieldComponent
  ],
  templateUrl: './ability-item.component.html',
  styleUrl: './ability-item.component.scss'
})
export class AbilityItemComponent {
  @Input() ability!: UnitAbility;
  @Input() canEdit = false;
  @Output() update = new EventEmitter<UnitAbility>();
  @Output() remove = new EventEmitter<void>();
  
  isEditing = false;
  editForm: Partial<UnitAbility> = {};

  startEdit() {
    this.isEditing = true;
    this.editForm = {
      name: this.ability.name,
      description: this.ability.description || '',
      flavour: this.ability.flavour || ''
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm = {};
  }

  saveEdit() {
    if (this.editForm.name?.trim()) {
      const updatedAbility: UnitAbility = {
        ...this.ability,
        name: this.editForm.name.trim(),
        description: this.editForm.description?.trim(),
        flavour: this.editForm.flavour?.trim()
      };
      this.update.emit(updatedAbility);
      this.isEditing = false;
    }
  }

  onRemove() {
    if (confirm(`Remove ability "${this.ability.name}"?`)) {
      this.remove.emit();
    }
  }
}