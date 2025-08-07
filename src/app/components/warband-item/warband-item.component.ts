import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Warband, Unit, UnitAbility } from '../../domain/model/faction.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { UnitItemComponent } from '../unit-item/unit-item.component';

@Component({
  selector: 'app-warband-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    TextFieldComponent,
    UnitItemComponent
  ],
  templateUrl: './warband-item.component.html',
  styleUrl: './warband-item.component.scss'
})
export class WarbandItemComponent {
  @Input() warband!: Warband;
  @Input() canEdit = false;
  @Output() update = new EventEmitter<Warband>();
  @Output() remove = new EventEmitter<void>();
  
  isExpanded = false;
  isEditing = false;
  isAddingUnit = false;
  editForm: Partial<Warband> = {};
  newUnitForm = { name: '', description: '', flavour: '', pointCost: 0 };

  get totalPointCost(): number {
    return this.warband.units.reduce((total, unit) => total + (unit.pointCost || 0), 0);
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  startEdit() {
    this.isEditing = true;
    this.editForm = {
      name: this.warband.name,
      description: this.warband.description || '',
      flavour: this.warband.flavour || ''
    };
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm = {};
  }

  saveEdit() {
    if (this.editForm.name?.trim()) {
      const updatedWarband: Warband = {
        ...this.warband,
        name: this.editForm.name.trim(),
        description: this.editForm.description?.trim(),
        flavour: this.editForm.flavour?.trim()
      };
      this.update.emit(updatedWarband);
      this.isEditing = false;
    }
  }

  onRemove() {
    if (confirm(`Remove warband "${this.warband.name}"?`)) {
      this.remove.emit();
    }
  }

  startAddUnit() {
    this.isAddingUnit = true;
    this.newUnitForm = { name: '', description: '', flavour: '', pointCost: 0 };
  }

  cancelAddUnit() {
    this.isAddingUnit = false;
    this.newUnitForm = { name: '', description: '', flavour: '', pointCost: 0 };
  }

  addUnit() {
    if (this.newUnitForm.name.trim()) {
      const newUnit: Unit = {
        id: crypto.randomUUID(),
        name: this.newUnitForm.name.trim(),
        description: this.newUnitForm.description?.trim(),
        flavour: this.newUnitForm.flavour?.trim(),
        pointCost: Number(this.newUnitForm.pointCost) || 0,
        abilities: [],
        isUserCreated: true
      };
      
      const updatedWarband: Warband = {
        ...this.warband,
        units: [...this.warband.units, newUnit]
      };
      
      this.update.emit(updatedWarband);
      this.isAddingUnit = false;
      this.newUnitForm = { name: '', description: '', flavour: '', pointCost: 0 };
    }
  }

  updateUnit(unitIndex: number, updatedUnit: Unit) {
    const units = [...this.warband.units];
    units[unitIndex] = updatedUnit;
    
    const updatedWarband: Warband = {
      ...this.warband,
      units
    };
    
    this.update.emit(updatedWarband);
  }

  removeUnit(unitIndex: number) {
    const units = this.warband.units.filter((_, index) => index !== unitIndex);
    
    const updatedWarband: Warband = {
      ...this.warband,
      units
    };
    
    this.update.emit(updatedWarband);
  }
}