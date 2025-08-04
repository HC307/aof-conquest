import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericCompendiumComponent } from './generic-compendium.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CompendiumConfig } from './generic-compendium.config';
import { BaseEntity } from '../../domain/model/base-entity.interface';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-test-display',
  template: '<div>{{ data?.name }}</div>',
  standalone: true
})
class TestDisplayComponent {
  @Input() data: any;
}

interface TestEntity extends BaseEntity {
  testProperty: string;
}

describe('GenericCompendiumComponent', () => {
  let component: GenericCompendiumComponent<TestEntity>;
  let fixture: ComponentFixture<GenericCompendiumComponent<TestEntity>>;
  
  const mockConfig: CompendiumConfig<TestEntity> = {
    title: 'Test Compendium',
    entityName: 'Test Entity',
    displayComponent: TestDisplayComponent,
    selector: (filter: string) => of([
      { id: '1', name: 'Test 1', testProperty: 'value1' },
      { id: '2', name: 'Test 2', testProperty: 'value2' }
    ]),
    emptyMessage: 'Select a test entity.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericCompendiumComponent],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericCompendiumComponent<TestEntity>);
    component = fixture.componentInstance;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty message when no item is selected', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Select a test entity.');
  });

  it('should load items on init', (done) => {
    component.ngOnInit();
    
    setTimeout(() => {
      expect(component.filteredItems()).toEqual([
        { id: '1', display: 'Test 1' },
        { id: '2', display: 'Test 2' }
      ]);
      done();
    }, 100);
  });
});