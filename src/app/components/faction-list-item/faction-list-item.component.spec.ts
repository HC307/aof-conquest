import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactionListItemComponent } from './faction-list-item.component';
import { Faction } from '../../domain/model/faction.interface';

describe('FactionListItemComponent', () => {
  let component: FactionListItemComponent;
  let fixture: ComponentFixture<FactionListItemComponent>;

  const mockFaction: Faction = {
    id: '1',
    name: 'Test Faction',
    warbands: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionListItemComponent);
    component = fixture.componentInstance;
    component.faction = mockFaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});