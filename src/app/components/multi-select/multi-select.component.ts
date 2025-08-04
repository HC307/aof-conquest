import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

export interface SelectOption {
  id: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent implements OnInit {
  @Input() options: SelectOption[] = [];
  @Input() selectedIds: string[] = [];
  @Input() label = 'Select items';
  @Input() placeholder = 'Click to select...';
  @Output() selectionChange = new EventEmitter<string[]>();

  isOpen = false;
  displayText = '';

  ngOnInit() {
    this.updateDisplayText();
    this.syncSelectedState();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleOption(option: SelectOption) {
    option.selected = !option.selected;
    this.updateSelection();
  }

  private syncSelectedState() {
    this.options.forEach(option => {
      option.selected = this.selectedIds.includes(option.id);
    });
  }

  private updateSelection() {
    const selected = this.options
      .filter(opt => opt.selected)
      .map(opt => opt.id);
    
    this.selectedIds = selected;
    this.selectionChange.emit(selected);
    this.updateDisplayText();
  }

  private updateDisplayText() {
    const selectedOptions = this.options.filter(opt => opt.selected);
    if (selectedOptions.length === 0) {
      this.displayText = this.placeholder;
    } else if (selectedOptions.length === 1) {
      this.displayText = selectedOptions[0].label;
    } else {
      this.displayText = `${selectedOptions.length} items selected`;
    }
  }

  onClickOutside() {
    this.isOpen = false;
  }
}