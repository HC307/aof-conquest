import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionCompendiumComponent } from './construction-compendium.component';

describe('ConstructionCompendiumComponent', () => {
  let component: ConstructionCompendiumComponent;
  let fixture: ComponentFixture<ConstructionCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionCompendiumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
