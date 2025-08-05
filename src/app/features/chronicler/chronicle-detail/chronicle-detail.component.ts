import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, filter } from 'rxjs';
import { Chronicle, ChronicleStatus } from '../../../domain/model/chronicle.interface';
import { AppState } from '../../../domain/store/app.state';
import { selectChronicleById } from '../../../domain/store/chronicles/chronicles.selector';
import { chronicleEntityActions } from '../../../domain/store/chronicles/chronicle.actions';
import { PanelComponent } from '../../../components/panel/panel.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { UserCreatedIndicatorComponent } from '../../../components/user-created-indicator/user-created-indicator.component';
import { EntityFormDialogComponent } from '../../../components/entity-form-dialog/entity-form-dialog.component';

@Component({
  selector: 'app-chronicle-detail',
  standalone: true,
  imports: [
    CommonModule,
    PanelComponent,
    ButtonComponent,
    UserCreatedIndicatorComponent,
    EntityFormDialogComponent
  ],
  templateUrl: './chronicle-detail.component.html',
  styleUrls: ['./chronicle-detail.component.scss']
})
export class ChronicleDetailComponent implements OnInit {
  chronicle$: Observable<Chronicle | undefined>;
  showEditDialog = false;
  currentChronicle: Chronicle | undefined;
  ChronicleStatus = ChronicleStatus;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.chronicle$ = this.store.select(selectChronicleById(id || ''));
  }

  ngOnInit(): void {
    this.chronicle$.pipe(
      filter(chronicle => !!chronicle)
    ).subscribe(chronicle => {
      this.currentChronicle = chronicle;
    });

    // Redirect if chronicle not found
    this.chronicle$.pipe(
      map(chronicle => !chronicle)
    ).subscribe(notFound => {
      if (notFound) {
        this.router.navigate(['/chronicler']);
      }
    });
  }

  onEdit(): void {
    this.showEditDialog = true;
  }

  onSaveEdit(formData: Partial<Chronicle>): void {
    if (this.currentChronicle) {
      const updatedChronicle: Chronicle = {
        ...this.currentChronicle,
        ...formData,
        lastModified: new Date()
      };
      this.store.dispatch(chronicleEntityActions.updateChronicle({
        update: { id: updatedChronicle.id, changes: updatedChronicle }
      }));
      this.showEditDialog = false;
    }
  }

  onCancelEdit(): void {
    this.showEditDialog = false;
  }

  onDelete(): void {
    if (this.currentChronicle && confirm(`Are you sure you want to delete "${this.currentChronicle.name}"?`)) {
      this.store.dispatch(chronicleEntityActions.removeChronicle({ id: this.currentChronicle.id }));
      this.router.navigate(['/chronicler']);
    }
  }

  onChangeStatus(newStatus: ChronicleStatus): void {
    if (this.currentChronicle) {
      const updatedChronicle: Chronicle = {
        ...this.currentChronicle,
        status: newStatus,
        lastModified: new Date()
      };
      this.store.dispatch(chronicleEntityActions.updateChronicle({
        update: { id: updatedChronicle.id, changes: updatedChronicle }
      }));
    }
  }

  onIncrementTurn(): void {
    if (this.currentChronicle) {
      const updatedChronicle: Chronicle = {
        ...this.currentChronicle,
        currentTurn: this.currentChronicle.currentTurn + 1,
        lastModified: new Date()
      };
      this.store.dispatch(chronicleEntityActions.updateChronicle({
        update: { id: updatedChronicle.id, changes: updatedChronicle }
      }));
    }
  }

  onBack(): void {
    this.router.navigate(['/chronicler']);
  }

  getStatusClass(status: ChronicleStatus): string {
    switch (status) {
      case ChronicleStatus.ACTIVE:
        return 'status-active';
      case ChronicleStatus.COMPLETED:
        return 'status-completed';
      case ChronicleStatus.PAUSED:
        return 'status-paused';
      default:
        return '';
    }
  }
}