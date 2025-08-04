import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent, SelectOption } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.label).toBe('Select items');
    expect(component.placeholder).toBe('Click to select...');
    expect(component.isOpen).toBe(false);
    expect(component.options).toEqual([]);
    expect(component.selectedIds).toEqual([]);
  });

  it('should sync selected state on init', () => {
    const options: SelectOption[] = [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' }
    ];
    component.options = options;
    component.selectedIds = ['1', '3'];
    
    component.ngOnInit();
    
    expect(component.options[0].selected).toBe(true);
    expect(component.options[1].selected).toBe(false);
    expect(component.options[2].selected).toBe(true);
  });

  it('should toggle dropdown state', () => {
    expect(component.isOpen).toBe(false);
    
    component.toggleDropdown();
    expect(component.isOpen).toBe(true);
    
    component.toggleDropdown();
    expect(component.isOpen).toBe(false);
  });

  it('should toggle option selection', () => {
    const option: SelectOption = { id: '1', label: 'Option 1', selected: false };
    const emitSpy = spyOn(component.selectionChange, 'emit');
    component.options = [option];
    
    component.toggleOption(option);
    
    expect(option.selected).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith(['1']);
  });

  it('should update display text correctly', () => {
    const options: SelectOption[] = [
      { id: '1', label: 'Option 1', selected: false },
      { id: '2', label: 'Option 2', selected: false }
    ];
    component.options = options;
    component.placeholder = 'Select...';
    
    // No selection
    component['updateDisplayText']();
    expect(component.displayText).toBe('Select...');
    
    // One selection
    options[0].selected = true;
    component['updateDisplayText']();
    expect(component.displayText).toBe('Option 1');
    
    // Multiple selections
    options[1].selected = true;
    component['updateDisplayText']();
    expect(component.displayText).toBe('2 items selected');
  });

  it('should close dropdown on outside click', () => {
    component.isOpen = true;
    
    component.onClickOutside();
    
    expect(component.isOpen).toBe(false);
  });
});