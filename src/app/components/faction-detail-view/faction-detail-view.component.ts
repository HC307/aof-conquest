import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Faction, Warband } from '../../domain/model/faction.interface';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';
import { WarbandItemComponent } from '../warband-item/warband-item.component';

@Component({
  selector: 'app-faction-detail-view',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonComponent, 
    TextFieldComponent, 
    UserCreatedIndicatorComponent,
    WarbandItemComponent
  ],
  templateUrl: './faction-detail-view.component.html',
  styleUrl: './faction-detail-view.component.scss'
})
export class FactionDetailViewComponent {
  @Input() faction: Faction | null = null;
  @Input() canEdit = false;
  @Output() update = new EventEmitter<Faction>();
  
  isEditing = false;
  isAddingWarband = false;
  editForm: Partial<Faction> = {};
  newWarbandForm = { name: '', description: '', flavour: '' };

  ngOnChanges() {
    this.isEditing = false;
    if (this.faction) {
      this.resetForm();
    }
  }

  startEdit() {
    this.isEditing = true;
    this.resetForm();
  }

  cancelEdit() {
    this.isEditing = false;
    this.resetForm();
  }

  saveEdit() {
    if (this.faction && this.editForm.name?.trim()) {
      const updatedFaction: Faction = {
        ...this.faction,
        name: this.editForm.name.trim(),
        description: this.editForm.description?.trim(),
        flavour: this.editForm.flavour?.trim()
      };
      this.update.emit(updatedFaction);
      this.isEditing = false;
    }
  }

  private resetForm() {
    if (this.faction) {
      this.editForm = {
        name: this.faction.name,
        description: this.faction.description || '',
        flavour: this.faction.flavour || ''
      };
    }
  }

  startAddWarband() {
    this.isAddingWarband = true;
    this.newWarbandForm = { name: '', description: '', flavour: '' };
  }

  cancelAddWarband() {
    this.isAddingWarband = false;
    this.newWarbandForm = { name: '', description: '', flavour: '' };
  }

  addWarband() {
    if (this.faction && this.newWarbandForm.name.trim()) {
      const newWarband: Warband = {
        id: crypto.randomUUID(),
        name: this.newWarbandForm.name.trim(),
        description: this.newWarbandForm.description?.trim(),
        flavour: this.newWarbandForm.flavour?.trim(),
        units: [],
        isUserCreated: true
      };
      
      const updatedFaction: Faction = {
        ...this.faction,
        warbands: [...this.faction.warbands, newWarband]
      };
      
      this.update.emit(updatedFaction);
      this.isAddingWarband = false;
      this.newWarbandForm = { name: '', description: '', flavour: '' };
    }
  }

  updateWarband(warbandIndex: number, updatedWarband: Warband) {
    if (this.faction) {
      const warbands = [...this.faction.warbands];
      warbands[warbandIndex] = updatedWarband;
      
      const updatedFaction: Faction = {
        ...this.faction,
        warbands
      };
      
      this.update.emit(updatedFaction);
    }
  }

  removeWarband(warbandIndex: number) {
    if (this.faction) {
      const warbands = this.faction.warbands.filter((_, index) => index !== warbandIndex);
      
      const updatedFaction: Faction = {
        ...this.faction,
        warbands
      };
      
      this.update.emit(updatedFaction);
    }
  }
}