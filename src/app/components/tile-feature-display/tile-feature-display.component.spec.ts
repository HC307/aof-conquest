import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFeatureDisplayComponent } from './tile-feature-display.component';

describe('TileDisplayComponent', () => {
  let component: TileFeatureDisplayComponent;
  let fixture: ComponentFixture<TileFeatureDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileFeatureDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileFeatureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
