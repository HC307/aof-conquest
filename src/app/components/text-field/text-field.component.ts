import {Component, EventEmitter, Input, Output, forwardRef} from '@angular/core';
import {FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required = false;
  @Input() type: string = 'text';
  @Output() textChanged = new EventEmitter<string>();

  textValue: string = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.textValue = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTextChange(value: string): void {
    this.textValue = value;
    this.onChange(value);
    this.onTouched();
    this.textChanged.emit(value);
  }
}
