import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../domain/store/app.state';
import { PanelComponent } from '../../components/panel/panel.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';
import { tileActions } from '../../domain/store/tiles/tile.actions';
import { constructionActions } from '../../domain/store/constructions/construction.actions';
import { trophyActions } from '../../domain/store/trophies/trophy.actions';
import { randomEncounterActions } from '../../domain/store/random-encounter/random-encounter.actions';
import { tileFeatureActions } from '../../domain/store/tile-features/tile-feature.actions';
import { ruleActions } from '../../domain/store/rules/rules.actions';
import { factionActions } from '../../domain/store/factions/faction.actions';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [PanelComponent, ButtonComponent, CardComponent],
  template: `
    <h2>Configuration</h2>
    <div class="configuration-container">
      <app-panel title="User-Created Content Management">
        <div class="content-section">
          <h3>Delete User-Created Content</h3>
          <p class="warning">⚠️ Warning: These actions cannot be undone!</p>
          
          <div class="delete-buttons">
            <app-card>
              <h4>Tiles</h4>
              <p>Delete all user-created tiles</p>
              <app-button 
                (click)="deleteAllCustomTiles()"
                [disabled]="false">
                Delete All Custom Tiles
              </app-button>
            </app-card>

            <app-card>
              <h4>Constructions</h4>
              <p>Delete all user-created constructions</p>
              <app-button 
                (click)="deleteAllCustomConstructions()"
                [disabled]="false">
                Delete All Custom Constructions
              </app-button>
            </app-card>

            <app-card>
              <h4>Trophies</h4>
              <p>Delete all user-created trophies</p>
              <app-button 
                (click)="deleteAllCustomTrophies()"
                [disabled]="false">
                Delete All Custom Trophies
              </app-button>
            </app-card>

            <app-card>
              <h4>Random Encounters</h4>
              <p>Delete all user-created random encounters</p>
              <app-button 
                (click)="deleteAllCustomRandomEncounters()"
                [disabled]="false">
                Delete All Custom Encounters
              </app-button>
            </app-card>

            <app-card>
              <h4>Tile Features</h4>
              <p>Delete all user-created tile features</p>
              <app-button 
                (click)="deleteAllCustomTileFeatures()"
                [disabled]="false">
                Delete All Custom Features
              </app-button>
            </app-card>

            <app-card>
              <h4>Rules</h4>
              <p>Delete all user-created rules</p>
              <app-button 
                (click)="deleteAllCustomRules()"
                [disabled]="false">
                Delete All Custom Rules
              </app-button>
            </app-card>

            <app-card>
              <h4>Factions</h4>
              <p>Delete all user-created factions</p>
              <app-button 
                (click)="deleteAllCustomFactions()"
                [disabled]="false">
                Delete All Custom Factions
              </app-button>
            </app-card>
          </div>
        </div>
      </app-panel>
    </div>
  `,
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  private readonly store = inject(Store<AppState>);

  deleteAllCustomTiles(): void {
    if (confirm('Are you sure you want to delete all custom tiles? This action cannot be undone.')) {
      this.store.dispatch(tileActions.removeAllCustom());
    }
  }

  deleteAllCustomConstructions(): void {
    if (confirm('Are you sure you want to delete all custom constructions? This action cannot be undone.')) {
      this.store.dispatch(constructionActions.removeAllCustom());
    }
  }

  deleteAllCustomTrophies(): void {
    if (confirm('Are you sure you want to delete all custom trophies? This action cannot be undone.')) {
      this.store.dispatch(trophyActions.removeAllCustom());
    }
  }

  deleteAllCustomRandomEncounters(): void {
    if (confirm('Are you sure you want to delete all custom random encounters? This action cannot be undone.')) {
      this.store.dispatch(randomEncounterActions.removeAllCustom());
    }
  }

  deleteAllCustomTileFeatures(): void {
    if (confirm('Are you sure you want to delete all custom tile features? This action cannot be undone.')) {
      this.store.dispatch(tileFeatureActions.removeAllCustom());
    }
  }

  deleteAllCustomRules(): void {
    if (confirm('Are you sure you want to delete all custom rules? This action cannot be undone.')) {
      this.store.dispatch(ruleActions.removeAllCustom());
    }
  }

  deleteAllCustomFactions(): void {
    if (confirm('Are you sure you want to delete all custom factions? This will remove all factions from all campaigns. This action cannot be undone.')) {
      this.store.dispatch(factionActions.removeAllCustom());
    }
  }
}