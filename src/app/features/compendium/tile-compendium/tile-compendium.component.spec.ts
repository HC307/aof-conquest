import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileCompendiumComponent } from './tile-compendium.component';

describe('TileCompendiumComponent', () => {
  let component: TileCompendiumComponent;
  let fixture: ComponentFixture<TileCompendiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileCompendiumComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileCompendiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
