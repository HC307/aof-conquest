import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Faction } from '../../domain/model/faction.interface';
import { PanelComponent } from '../panel/panel.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-faction-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent, TextFieldComponent, ButtonComponent],
  templateUrl: './faction-form-dialog.component.html',
  styleUrl: './faction-form-dialog.component.scss'
})
export class FactionFormDialogComponent implements OnInit, OnChanges {
  @Input() title = 'Faction';
  @Input() faction: Partial<Faction> = {};
  @Output() save = new EventEmitter<Partial<Faction>>();
  @Output() cancel = new EventEmitter<void>();

  formData: Partial<Faction> = {};

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges() {
    this.resetForm();
  }

  private resetForm() {
    // Create a deep copy to avoid modifying the original faction
    this.formData = {
      id: this.faction.id,
      name: this.faction.name || '',
      description: this.faction.description || '',
      flavour: this.faction.flavour || '',
      keywords: this.faction.keywords ? [...this.faction.keywords] : [],
      warbands: this.faction.warbands ? [...this.faction.warbands] : [],
      campaignId: this.faction.campaignId,
      isUserCreated: this.faction.isUserCreated
    };
  }

  onSubmit() {
    if (this.formData.name?.trim()) {
      // Emit only the editable fields, not the ID
      const dataToSave: Partial<Faction> = {
        name: this.formData.name,
        description: this.formData.description,
        flavour: this.formData.flavour,
        keywords: this.formData.keywords,
        warbands: this.formData.warbands
      };
      this.save.emit(dataToSave);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onBackdropClick(event: MouseEvent) {
    // Only cancel if clicking directly on the backdrop
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}