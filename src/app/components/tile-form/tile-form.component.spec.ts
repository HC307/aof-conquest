import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TileFormComponent } from './tile-form.component';
import { TileFeatureEntitiesSelectors } from '../../domain/store/tile-features/tile-feature.selectors';

describe('TileFormComponent', () => {
  let component: TileFormComponent;
  let fixture: ComponentFixture<TileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: TileFeatureEntitiesSelectors.all,
              value: [
                { id: 'herd', name: 'Herd' },
                { id: 'ore', name: 'Ore' },
                { id: 'flounts', name: 'Flounts' }
              ]
            }
          ]
        })
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form data', () => {
    expect(component.formData).toEqual({ features: [] });
  });

  it('should validate form correctly', () => {
    expect(component.isValid()).toBe(false);
    
    component.formData.name = 'Test Tile';
    expect(component.isValid()).toBe(true);
    
    component.formData.name = '   ';
    expect(component.isValid()).toBe(false);
  });

  it('should emit save event with form data', () => {
    const saveSpy = spyOn(component.save, 'emit');
    
    component.formData = {
      name: 'Test Tile',
      description: 'A test forest tile',
      features: ['herd', 'ore']
    };
    
    component.onSave();
    
    expect(saveSpy).toHaveBeenCalledWith({
      name: 'Test Tile',
      description: 'A test forest tile',
      features: ['herd', 'ore']
    });
  });

  it('should emit cancel event', () => {
    const cancelSpy = spyOn(component.cancel, 'emit');
    
    component.onCancel();
    
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should update features when selection changes', () => {
    component.onFeatureSelectionChange(['herd', 'flounts']);
    
    expect(component.formData.features).toEqual(['herd', 'flounts']);
  });
});