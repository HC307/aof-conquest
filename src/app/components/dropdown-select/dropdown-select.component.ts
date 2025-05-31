import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-dropdown-select',
  imports: [ButtonComponent],
  templateUrl: './dropdown-select.component.html',
  styleUrl: './dropdown-select.component.scss',
})
export class DropdownSelectComponent {
  @Input() options?: string[] = [];

  protected selected?: string;

  @Output() selectedOption = new EventEmitter<string>();

  protected OnSelect(value: string) {
    this.selected = value;
    this.selectedOption.emit(value);
  }
}
