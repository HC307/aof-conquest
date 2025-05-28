import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophiesCompendiumComponent} from './trophies-compendium.component';

describe('TrophiesCompendiumComponent', () => {
  let component: TrophiesCompendiumComponent;
  let fixture: ComponentFixture<TrophiesCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophiesCompendiumComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrophiesCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
