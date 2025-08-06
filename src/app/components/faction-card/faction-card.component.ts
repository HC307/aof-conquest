import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faction } from '../../domain/model/faction.interface';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';

@Component({
  selector: 'app-faction-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, UserCreatedIndicatorComponent],
  templateUrl: './faction-card.component.html',
  styleUrl: './faction-card.component.scss'
})
export class FactionCardComponent {
  @Input() faction!: Faction;
  @Input() showActions = true;
  @Output() edit = new EventEmitter<Faction>();
  @Output() remove = new EventEmitter<Faction>();
  @Output() viewDetails = new EventEmitter<Faction>();

  onEdit() {
    this.edit.emit(this.faction);
  }

  onRemove() {
    this.remove.emit(this.faction);
  }

  onViewDetails() {
    this.viewDetails.emit(this.faction);
  }
}