import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit, UnitAbility } from '../../domain/model/faction.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { AbilityItemComponent } from '../ability-item/ability-item.component';

@Component({
  selector: 'app-unit-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    TextFieldComponent,
    AbilityItemComponent
  ],
  templateUrl: './unit-item.component.html',
  styleUrl: './unit-item.component.scss'
})
export class UnitItemComponent {
  @Input() unit!: Unit;
  @Input() canEdit = false;
  @Output() update = new EventEmitter<Unit>();
  @Output() remove = new EventEmitter<void>();
  
  isExpanded = false;
  isEditing = false;
  isAddingAbility = false;
  editForm: Partial<Unit> = {};
  newAbilityForm = { name: '', description: '', flavour: '' };

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  startEdit() {
    this.isEditing = true;
    this.editForm = {
      name: this.unit.name,
      description: this.unit.description || '',
      flavour: this.unit.flavour || '',
      pointCost: this.unit.pointCost || 0
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm = {};
  }

  saveEdit() {
    if (this.editForm.name?.trim()) {
      const updatedUnit: Unit = {
        ...this.unit,
        name: this.editForm.name.trim(),
        description: this.editForm.description?.trim(),
        flavour: this.editForm.flavour?.trim(),
        pointCost: Number(this.editForm.pointCost) || 0
      };
      this.update.emit(updatedUnit);
      this.isEditing = false;
    }
  }

  onRemove() {
    if (confirm(`Remove unit "${this.unit.name}"?`)) {
      this.remove.emit();
    }
  }

  startAddAbility() {
    this.isAddingAbility = true;
    this.newAbilityForm = { name: '', description: '', flavour: '' };
  }

  cancelAddAbility() {
    this.isAddingAbility = false;
    this.newAbilityForm = { name: '', description: '', flavour: '' };
  }

  addAbility() {
    if (this.newAbilityForm.name.trim()) {
      const newAbility: UnitAbility = {
        id: crypto.randomUUID(),
        name: this.newAbilityForm.name.trim(),
        description: this.newAbilityForm.description?.trim(),
        flavour: this.newAbilityForm.flavour?.trim(),
        isUserCreated: true
      };
      
      const updatedUnit: Unit = {
        ...this.unit,
        abilities: [...this.unit.abilities, newAbility]
      };
      
      this.update.emit(updatedUnit);
      this.isAddingAbility = false;
      this.newAbilityForm = { name: '', description: '', flavour: '' };
    }
  }

  updateAbility(abilityIndex: number, updatedAbility: UnitAbility) {
    const abilities = [...this.unit.abilities];
    abilities[abilityIndex] = updatedAbility;
    
    const updatedUnit: Unit = {
      ...this.unit,
      abilities
    };
    
    this.update.emit(updatedUnit);
  }

  removeAbility(abilityIndex: number) {
    const abilities = this.unit.abilities.filter((_, index) => index !== abilityIndex);
    
    const updatedUnit: Unit = {
      ...this.unit,
      abilities
    };
    
    this.update.emit(updatedUnit);
  }
}