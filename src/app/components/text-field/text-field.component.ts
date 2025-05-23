import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {

  @Output() textChanged = new EventEmitter<string>();

  textValue: string = '';

  onTextChange(value: string): void {
    this.textChanged.emit(value);
  }
}
