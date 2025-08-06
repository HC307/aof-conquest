import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Faction, Warband } from '../../domain/model/faction.interface';
import { PanelComponent } from '../panel/panel.component';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';

@Component({
  selector: 'app-faction-detail-view',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PanelComponent, 
    ButtonComponent, 
    TextFieldComponent, 
    UserCreatedIndicatorComponent
  ],
  templateUrl: './faction-detail-view.component.html',
  styleUrl: './faction-detail-view.component.scss'
})
export class FactionDetailViewComponent {
  @Input() faction: Faction | null = null;
  @Input() canEdit = false;
  @Output() update = new EventEmitter<Faction>();
  @Output() addWarband = new EventEmitter<void>();
  @Output() removeWarband = new EventEmitter<Warband>();
  
  isEditing = false;
  editForm: Partial<Faction> = {};

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

  onAddWarband() {
    this.addWarband.emit();
  }

  onRemoveWarband(warband: Warband) {
    if (confirm(`Remove warband "${warband.name}"?`)) {
      this.removeWarband.emit(warband);
    }
  }
}