import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FactionFormDialogComponent } from './faction-form-dialog.component';

describe('FactionFormDialogComponent', () => {
  let component: FactionFormDialogComponent;
  let fixture: ComponentFixture<FactionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactionFormDialogComponent, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});