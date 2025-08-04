import { Component, DestroyRef, inject, Input, OnInit, ViewChild, ViewContainerRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BehaviorSubject, switchMap, skip } from 'rxjs';
import { AppState } from '../../domain/store/app.state';
import { BaseEntity } from '../../domain/model/base-entity.interface';
import { ToggleListComponent } from '../toggle-list/toggle-list.component';
import { CompendiumConfig } from './generic-compendium.config';
import { ButtonComponent } from '../button/button.component';
import { EntityFormComponent } from '../entity-form/entity-form.component';

@Component({
  selector: 'app-generic-compendium',
  standalone: true,
  imports: [CommonModule, ToggleListComponent, ButtonComponent, EntityFormComponent],
  templateUrl: './generic-compendium.component.html',
  styleUrls: ['./generic-compendium.component.scss']
})
export class GenericCompendiumComponent<T extends BaseEntity> implements OnInit, AfterViewChecked {
  @Input({ required: true }) config!: CompendiumConfig<T>;
  @ViewChild('displayContainer', { read: ViewContainerRef }) displayContainer?: ViewContainerRef;
  @ViewChild('formContainer', { read: ViewContainerRef }) formContainer?: ViewContainerRef;

  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store<AppState>);
  private readonly cdr = inject(ChangeDetectorRef);

  protected items?: T[];
  protected selectionId?: string;
  filter$ = new BehaviorSubject<string>('');
  private needsComponentUpdate = false;
  private lastRenderedId?: string;

  // Add form properties
  isAddingNew = false;
  newEntity: Partial<T> = {};

  filteredItems(): { id: string; display: string }[] | undefined {
    if (!this.items) return undefined;

    return this.items.map((item) => ({
      id: item.id,
      display: item.name,
    }));
  }

  ngOnInit(): void {
    this.filter$
      .pipe(
        switchMap((filter) => this.config.selector(filter)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((entities) => {
        this.items = entities;
        
        // Clear selection if the selected item was deleted
        if (this.selectionId && !entities.find(e => e.id === this.selectionId)) {
          this.selectionId = undefined;
          this.lastRenderedId = undefined;
          if (this.displayContainer) {
            this.displayContainer.clear();
          }
        }
        
        // Force recreate display component if we have a selection to ensure fresh data
        if (this.selectionId && this.displayContainer) {
          const selected = this.selectedItem();
          if (selected) {
            // Check if component is in edit mode before recreating
            let isEditing = false;
            if (this.displayContainer.length > 0) {
              const existingRef = this.displayContainer.get(0) as any;
              isEditing = existingRef?.instance?.isEditing || false;
            }
            
            // Only recreate if not editing
            if (!isEditing) {
              this.displayContainer.clear();
              const componentRef = this.displayContainer.createComponent(this.config.displayComponent);
              componentRef.instance.data = selected;
              componentRef.changeDetectorRef.detectChanges();
            }
          }
        }
        
        this.cdr.markForCheck();
      });
  }

  ngAfterViewChecked(): void {
    // Don't update display component if we're adding a new entity
    if (this.isAddingNew) {
      return;
    }

    // Update display component after view is checked and container is available
    if (this.needsComponentUpdate && this.displayContainer && this.selectedItem()) {
      this.updateDisplayComponent();
      this.needsComponentUpdate = false;
    }
  }

  setFilter(newFilter: string): void {
    this.filter$.next(newFilter);
  }

  onSelectionChange(id: string): void {
    this.selectionId = id;
    this.isAddingNew = false;
    this.needsComponentUpdate = true;
    // Trigger change detection to create the container
    this.cdr.detectChanges();
  }

  selectedItem(): T | undefined {
    return this.items?.find((item) => item.id === this.selectionId);
  }

  private updateDisplayComponent(): void {
    const selected = this.selectedItem();

    if (!selected) {
      return;
    }

    // Only create new component if ID changed
    if (this.lastRenderedId === selected.id) {
      return;
    }

    // Clear and create new component
    this.displayContainer!.clear();
    const componentRef = this.displayContainer!.createComponent(this.config.displayComponent);
    componentRef.instance.data = selected;
    this.lastRenderedId = selected.id;

    // Ensure the new component is rendered
    componentRef.changeDetectorRef.detectChanges();
  }

  // Form methods
  showAddForm(): void {
    this.newEntity = this.config.createNew ? this.config.createNew() : {};
    this.isAddingNew = true;
    this.selectionId = undefined;
    this.needsComponentUpdate = false;
    
    // If we have a custom form component, create it after view updates
    if (this.config.formComponent) {
      setTimeout(() => {
        this.createFormComponent();
      });
    }
  }
  
  private createFormComponent(): void {
    if (!this.formContainer || !this.config.formComponent) {
      return;
    }
    
    this.formContainer.clear();
    const componentRef = this.formContainer.createComponent(this.config.formComponent);
    componentRef.instance.initialData = this.newEntity;
    componentRef.instance.isEditing = false;
    
    // Subscribe to save event
    if (componentRef.instance.save) {
      componentRef.instance.save.subscribe((entity: Partial<T>) => {
        this.onSaveNewEntity(entity);
      });
    }
    
    // Subscribe to cancel event
    if (componentRef.instance.cancel) {
      componentRef.instance.cancel.subscribe(() => {
        this.cancelAddForm();
      });
    }
    
    componentRef.changeDetectorRef.detectChanges();
  }

  cancelAddForm(): void {
    this.isAddingNew = false;
    this.newEntity = {};
    if (this.formContainer) {
      this.formContainer.clear();
    }
  }

  onSaveNewEntity(entity: Partial<T>): void {
    if (this.config.onAdd) {
      // Generate a unique ID if not provided and mark as user-created
      const newEntity = {
        ...entity,
        id: entity.id || this.generateId(),
        isUserCreated: true
      } as T;

      this.config.onAdd(newEntity);
      this.isAddingNew = false;
      this.newEntity = {};

      // Select the newly added entity
      setTimeout(() => {
        this.onSelectionChange(newEntity.id);
      }, 100);
    }
  }

  private generateId(): string {
    return `${this.config.entityName.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
