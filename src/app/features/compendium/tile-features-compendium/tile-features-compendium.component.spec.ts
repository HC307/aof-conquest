import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFeatureCompendiumComponent } from './tile-features-compendium.component';

describe('LocationCompendiumComponent', () => {
  let component: TileFeatureCompendiumComponent;
  let fixture: ComponentFixture<TileFeatureCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileFeatureCompendiumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileFeatureCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
