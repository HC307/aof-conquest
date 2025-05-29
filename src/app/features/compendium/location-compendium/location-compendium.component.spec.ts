import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCompendiumComponent } from './location-compendium.component';

describe('LocationCompendiumComponent', () => {
  let component: LocationCompendiumComponent;
  let fixture: ComponentFixture<LocationCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationCompendiumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
