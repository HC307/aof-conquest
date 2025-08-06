import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faction } from '../../domain/model/faction.interface';
import { ButtonComponent } from '../button/button.component';
import { UserCreatedIndicatorComponent } from '../user-created-indicator/user-created-indicator.component';

@Component({
  selector: 'app-faction-list-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent, UserCreatedIndicatorComponent],
  templateUrl: './faction-list-item.component.html',
  styleUrl: './faction-list-item.component.scss'
})
export class FactionListItemComponent {
  @Input() faction!: Faction;
  @Input() selected = false;
  @Input() showActions = true;
  @Output() select = new EventEmitter<Faction>();
  @Output() remove = new EventEmitter<Faction>();

  onSelect() {
    this.select.emit(this.faction);
  }

  onRemove(event: Event) {
    event.stopPropagation();
    this.remove.emit(this.faction);
  }
}