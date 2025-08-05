import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChronicleDetailComponent } from './chronicle-detail.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('ChronicleDetailComponent', () => {
  let component: ChronicleDetailComponent;
  let fixture: ComponentFixture<ChronicleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronicleDetailComponent],
      providers: [
        provideMockStore({
          initialState: {
            chronicles: {
              ids: [],
              entities: {}
            }
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test-id'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChronicleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});