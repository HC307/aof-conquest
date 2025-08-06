import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactionCardComponent } from './faction-card.component';
import { Faction } from '../../domain/model/faction.interface';

describe('FactionCardComponent', () => {
  let component: FactionCardComponent;
  let fixture: ComponentFixture<FactionCardComponent>;

  const mockFaction: Faction = {
    id: '1',
    name: 'Test Faction',
    warbands: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionCardComponent);
    component = fixture.componentInstance;
    component.faction = mockFaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});