import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, filter } from 'rxjs';
import { Campaign, CampaignStatus } from '../../../domain/model/campaign.interface';
import { Faction } from '../../../domain/model/faction.interface';
import { AppState } from '../../../domain/store/app.state';
import { selectCampaignById } from '../../../domain/store/campaigns/campaigns.selector';
import { campaignEntityActions } from '../../../domain/store/campaigns/campaign.actions';
import { selectFactionsByCampaignId, selectSelectedFaction, selectSelectedFactionId } from '../../../domain/store/factions/faction.selectors';
import { factionEntityActions, factionActions } from '../../../domain/store/factions/faction.actions';
import { PanelComponent } from '../../../components/panel/panel.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { UserCreatedIndicatorComponent } from '../../../components/user-created-indicator/user-created-indicator.component';
import { EntityFormDialogComponent } from '../../../components/entity-form-dialog/entity-form-dialog.component';
import { FactionListItemComponent } from '../../../components/faction-list-item/faction-list-item.component';
import { FactionDetailViewComponent } from '../../../components/faction-detail-view/faction-detail-view.component';
import { TabsComponent, Tab } from '../../../components/tabs/tabs.component';
import { TabPanelComponent } from '../../../components/tab-panel/tab-panel.component';

@Component({
  selector: 'app-chronicle-detail',
  standalone: true,
  imports: [
    CommonModule,
    PanelComponent,
    ButtonComponent,
    UserCreatedIndicatorComponent,
    EntityFormDialogComponent,
    FactionListItemComponent,
    FactionDetailViewComponent,
    TabsComponent,
    TabPanelComponent
  ],
  templateUrl: './chronicle-detail.component.html',
  styleUrls: ['./chronicle-detail.component.scss']
})
export class ChronicleDetailComponent implements OnInit {
  chronicle$: Observable<Campaign | undefined>;
  factions$: Observable<Faction[]>;
  selectedFaction$: Observable<Faction | null>;
  selectedFactionId$: Observable<string | null>;
  showEditDialog = false;
  currentChronicle: Campaign | undefined;
  CampaignStatus = CampaignStatus;
  
  tabs: Tab[] = [
    { id: 'factions', label: 'Factions', icon: '⚔️' },
    { id: 'timeline', label: 'Timeline', icon: '📅' }
  ];
  activeTabId = 'factions';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.chronicle$ = this.store.select(selectCampaignById(id || ''));
    this.factions$ = this.store.select(selectFactionsByCampaignId(id || ''));
    this.selectedFaction$ = this.store.select(selectSelectedFaction);
    this.selectedFactionId$ = this.store.select(selectSelectedFactionId);
  }

  ngOnInit(): void {
    this.chronicle$.pipe(
      filter(chronicle => !!chronicle)
    ).subscribe(chronicle => {
      this.currentChronicle = chronicle;
      // Clear faction selection when switching campaigns
      this.store.dispatch(factionActions.selectFaction({ id: null }));
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

  onSaveEdit(formData: Partial<Campaign>): void {
    if (this.currentChronicle) {
      const updatedChronicle: Campaign = {
        ...this.currentChronicle,
        ...formData,
        lastModified: new Date()
      };
      this.store.dispatch(campaignEntityActions.updateCampaign({
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
      this.store.dispatch(campaignEntityActions.removeCampaign({ id: this.currentChronicle.id }));
      this.router.navigate(['/chronicler']);
    }
  }

  onChangeStatus(newStatus: CampaignStatus): void {
    if (this.currentChronicle) {
      const updatedChronicle: Campaign = {
        ...this.currentChronicle,
        status: newStatus,
        lastModified: new Date()
      };
      this.store.dispatch(campaignEntityActions.updateCampaign({
        update: { id: updatedChronicle.id, changes: updatedChronicle }
      }));
    }
  }

  onIncrementTurn(): void {
    if (this.currentChronicle) {
      const updatedChronicle: Campaign = {
        ...this.currentChronicle,
        currentTurn: this.currentChronicle.currentTurn + 1,
        lastModified: new Date()
      };
      this.store.dispatch(campaignEntityActions.updateCampaign({
        update: { id: updatedChronicle.id, changes: updatedChronicle }
      }));
    }
  }

  onBack(): void {
    this.router.navigate(['/chronicler']);
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

  // Faction Management Methods
  onSelectFaction(faction: Faction): void {
    this.store.dispatch(factionActions.selectFaction({ id: faction.id }));
  }

  onAddFaction(): void {
    if (this.currentChronicle) {
      const newFaction: Faction = {
        id: crypto.randomUUID(),
        campaignId: this.currentChronicle.id,
        name: 'New Faction',
        description: '',
        flavour: '',
        keywords: [],
        warbands: [],
        isUserCreated: true
      };
      this.store.dispatch(factionEntityActions.addFaction({ faction: newFaction }));
      this.store.dispatch(factionActions.selectFaction({ id: newFaction.id }));
    }
  }

  onUpdateFaction(faction: Faction): void {
    // Ensure campaignId is preserved
    const updatedFaction = {
      ...faction,
      campaignId: this.currentChronicle?.id || faction.campaignId
    };
    this.store.dispatch(factionEntityActions.updateFaction({
      update: { id: faction.id, changes: updatedFaction }
    }));
  }

  onRemoveFaction(faction: Faction): void {
    if (confirm(`Are you sure you want to delete the faction "${faction.name}"?`)) {
      this.store.dispatch(factionEntityActions.removeFaction({ id: faction.id }));
    }
  }

  onTabChange(tabId: string): void {
    this.activeTabId = tabId;
  }
}
