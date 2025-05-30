import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomEncounterDisplayComponent } from './random-encounter-display.component';

describe('RandomEncounterDisplayComponent', () => {
  let component: RandomEncounterDisplayComponent;
  let fixture: ComponentFixture<RandomEncounterDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomEncounterDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomEncounterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
