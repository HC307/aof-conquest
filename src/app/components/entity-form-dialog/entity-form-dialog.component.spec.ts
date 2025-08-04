import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityFormDialogComponent } from './entity-form-dialog.component';
import { FormsModule } from '@angular/forms';
import { BaseEntity } from '../../domain/model/base-entity.interface';

interface TestEntity extends BaseEntity {
  testProperty?: string;
}

describe('EntityFormDialogComponent', () => {
  let component: EntityFormDialogComponent<TestEntity>;
  let fixture: ComponentFixture<EntityFormDialogComponent<TestEntity>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormDialogComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormDialogComponent<TestEntity>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel event', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should validate entity name', () => {
    component.entity = { name: '' };
    expect(component.isValid()).toBeFalse();
    
    component.entity = { name: 'Test' };
    expect(component.isValid()).toBeTrue();
  });

  it('should emit save event with valid entity', () => {
    spyOn(component.save, 'emit');
    component.entity = { name: 'Test Entity', description: 'Test' };
    component.onSave();
    expect(component.save.emit).toHaveBeenCalledWith(component.entity);
  });
});