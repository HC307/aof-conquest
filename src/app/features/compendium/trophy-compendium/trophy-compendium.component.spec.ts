import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyCompendiumComponent } from './trophy-compendium.component';

describe('TrophiesCompendiumComponent', () => {
  let component: TrophyCompendiumComponent;
  let fixture: ComponentFixture<TrophyCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyCompendiumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrophyCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
