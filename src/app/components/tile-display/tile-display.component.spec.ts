import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TileDisplayComponent} from './tile-display.component';

describe('TileDisplayComponent', () => {
  let component: TileDisplayComponent;
  let fixture: ComponentFixture<TileDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
