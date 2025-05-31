import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChroniclerComponent } from './chronicler.component';

describe('ChroniclerComponent', () => {
  let component: ChroniclerComponent;
  let fixture: ComponentFixture<ChroniclerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChroniclerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChroniclerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
