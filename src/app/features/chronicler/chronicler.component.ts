import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Chronicle, ChronicleStatus } from '../../domain/model/chronicle.interface';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { PanelComponent } from '../../components/panel/panel.component';
import { EntityFormDialogComponent } from '../../components/entity-form-dialog/entity-form-dialog.component';
import { selectAllChronicles } from '../../domain/store/chronicles/chronicles.selector';
import { chronicleEntityActions } from '../../domain/store/chronicles/chronicle.actions';
import { AppState } from '../../domain/store/app.state';
import { UserCreatedIndicatorComponent } from '../../components/user-created-indicator/user-created-indicator.component';

@Component({
  selector: 'app-chronicler',
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    PanelComponent,
    EntityFormDialogComponent,
    UserCreatedIndicatorComponent
  ],
  templateUrl: './chronicler.component.html',
  styleUrl: './chronicler.component.scss'
})
export class ChroniclerComponent implements OnInit {
  chronicles$: Observable<Chronicle[]>;
  showCreateDialog = false;
  ChronicleStatus = ChronicleStatus;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.chronicles$ = this.store.select(selectAllChronicles);
  }

  ngOnInit(): void {
    // Load chronicles from storage if needed
  }

  onCreateNewCampaign(): void {
    this.showCreateDialog = true;
  }

  onSelectCampaign(chronicle: Chronicle): void {
    this.router.navigate(['/chronicler', chronicle.id]);
  }

  onSaveNewCampaign(formData: Partial<Chronicle>): void {
    const newChronicle: Chronicle = {
      id: crypto.randomUUID(),
      name: formData.name || 'New Campaign',
      description: formData.description,
      flavour: formData.flavour,
      keywords: formData.keywords || [],
      createdDate: new Date(),
      lastModified: new Date(),
      playerCount: 1,
      currentTurn: 1,
      status: ChronicleStatus.ACTIVE,
      userCreated: true
    };

    this.store.dispatch(chronicleEntityActions.addChronicle({ chronicle: newChronicle }));
    this.showCreateDialog = false;
  }

  onCancelDialog(): void {
    this.showCreateDialog = false;
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
