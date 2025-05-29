import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomEncounterCompendiumComponent } from './random-encounter-compendium.component';

describe('RandomEncounterCompendiumComponent', () => {
  let component: RandomEncounterCompendiumComponent;
  let fixture: ComponentFixture<RandomEncounterCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomEncounterCompendiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomEncounterCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
