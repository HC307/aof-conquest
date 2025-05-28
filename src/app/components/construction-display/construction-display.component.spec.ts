import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionDisplayComponent } from './construction-display.component';

describe('ConstructionDisplayComponent', () => {
  let component: ConstructionDisplayComponent;
  let fixture: ComponentFixture<ConstructionDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
