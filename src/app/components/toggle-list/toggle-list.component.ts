import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TextFieldComponent } from '../text-field/text-field.component';
import { ToggleListInput } from './toggle-list.input';

@Component({
  selector: 'app-toggle-list',
  imports: [ButtonComponent, TextFieldComponent],
  templateUrl: './toggle-list.component.html',
  styleUrl: './toggle-list.component.scss',
})
export class ToggleListComponent {
  private _items?: ToggleListInput[];

  @Input()
  get items(): ToggleListInput[] | undefined {
    return this._items;
  }

  set items(value: ToggleListInput[] | undefined) {
    this._items = value;

    //Remove active option if its not in the filtered list
    if (
      this.selection &&
      this.items &&
      !this.items.map((value) => value.id).includes(this.selection)
    ) {
      this.selection = undefined;
    }

    //if theres only one result, set it active
    if (this.items && this.items.length == 1) {
      this.selection = this.items[0].id;
    }
  }

  @Output()
  selectedItem = new EventEmitter<string>();

  @Output()
  filters = new EventEmitter<string>();

  private _selection?: string;

  get selection(): string | undefined {
    return this._selection;
  }

  set selection(value: string | undefined) {
    this._selection = value;
    this.selectedItem.emit(this._selection);
  }
}
