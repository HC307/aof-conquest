import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarityDisplayComponent } from './rarity-display.component';

describe('RarityDisplayComponent', () => {
  let component: RarityDisplayComponent;
  let fixture: ComponentFixture<RarityDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RarityDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RarityDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
