import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrophyDisplayComponent} from './trophy-display.component';

describe('TrophyDisplayComponent', () => {
  let component: TrophyDisplayComponent;
  let fixture: ComponentFixture<TrophyDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrophyDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TrophyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
