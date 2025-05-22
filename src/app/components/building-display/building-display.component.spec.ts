import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingDisplayComponent } from './building-display.component';

describe('BuildingDisplayComponent', () => {
  let component: BuildingDisplayComponent;
  let fixture: ComponentFixture<BuildingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildingDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
