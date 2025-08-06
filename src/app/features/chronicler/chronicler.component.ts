import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Campaign, CampaignStatus } from '../../domain/model/campaign.interface';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { PanelComponent } from '../../components/panel/panel.component';
import { EntityFormDialogComponent } from '../../components/entity-form-dialog/entity-form-dialog.component';
import { selectAllCampaigns } from '../../domain/store/campaigns/campaigns.selector';
import { campaignEntityActions } from '../../domain/store/campaigns/campaign.actions';
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
  chronicles$: Observable<Campaign[]>;
  showCreateDialog = false;
  CampaignStatus = CampaignStatus;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.chronicles$ = this.store.select(selectAllCampaigns);
  }

  ngOnInit(): void {
    // Load chronicles from storage if needed
  }

  onCreateNewCampaign(): void {
    this.showCreateDialog = true;
  }

  onSelectCampaign(chronicle: Campaign): void {
    this.router.navigate(['/chronicler', chronicle.id]);
  }

  onSaveNewCampaign(formData: Partial<Campaign>): void {
    const newChronicle: Campaign = {
      id: crypto.randomUUID(),
      name: formData.name || 'New Campaign',
      description: formData.description,
      flavour: formData.flavour,
      keywords: formData.keywords || [],
      createdDate: new Date(),
      lastModified: new Date(),
      playerCount: 1,
      currentTurn: 1,
      status: CampaignStatus.ACTIVE,
      isUserCreated: true
    };

    this.store.dispatch(campaignEntityActions.addCampaign({ campaign: newChronicle }));
    this.showCreateDialog = false;
  }

  onCancelDialog(): void {
    this.showCreateDialog = false;
  }

  getStatusClass(status: CampaignStatus): string {
    switch (status) {
      case CampaignStatus.ACTIVE:
        return 'status-active';
      case CampaignStatus.COMPLETED:
        return 'status-completed';
      default:
        return '';
    }
  }
}
