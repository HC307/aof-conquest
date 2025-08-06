import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FactionDetailViewComponent } from './faction-detail-view.component';

describe('FactionDetailViewComponent', () => {
  let component: FactionDetailViewComponent;
  let fixture: ComponentFixture<FactionDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionDetailViewComponent, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});