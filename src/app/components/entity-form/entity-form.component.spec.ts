import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntityFormComponent } from './entity-form.component';
import { FormsModule } from '@angular/forms';
import { BaseEntity } from '../../domain/model/base-entity.interface';

interface TestEntity extends BaseEntity {
  testProperty?: string;
}

describe('EntityFormComponent', () => {
  let component: EntityFormComponent<TestEntity>;
  let fixture: ComponentFixture<EntityFormComponent<TestEntity>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFormComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EntityFormComponent<TestEntity>);
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
    component.formData = { name: '' };
    expect(component.isValid()).toBeFalse();
    
    component.formData = { name: 'Test' };
    expect(component.isValid()).toBeTrue();
  });

  it('should emit save event with valid entity', () => {
    spyOn(component.save, 'emit');
    component.formData = { name: 'Test Entity', description: 'Test' };
    component.onSave();
    expect(component.save.emit).toHaveBeenCalledWith(component.formData);
  });

  it('should initialize with initial data', () => {
    const initialData = { name: 'Initial', description: 'Test' };
    component.initialData = initialData;
    component.ngOnInit();
    expect(component.formData).toEqual(initialData);
  });
});