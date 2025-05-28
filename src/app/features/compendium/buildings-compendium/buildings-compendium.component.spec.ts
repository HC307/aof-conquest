import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BuildingsCompendiumComponent} from './buildings-compendium.component';

describe('BuildingsCompendiumComponent', () => {
  let component: BuildingsCompendiumComponent;
  let fixture: ComponentFixture<BuildingsCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingsCompendiumComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuildingsCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
