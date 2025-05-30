import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LootDisplayComponent } from './loot-display.component';

describe('LootDisplayComponent', () => {
  let component: LootDisplayComponent;
  let fixture: ComponentFixture<LootDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LootDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LootDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
