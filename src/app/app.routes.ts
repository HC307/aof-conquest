import { Routes } from '@angular/router';
import { AppRoutes } from './app.routes.interface';
import { HomeComponent } from './features/home/home.component';
import { RulesComponent } from './features/rules/rules.component';
import { GeneratorsComponent } from './features/generators/generators.component';
import { CompendiumComponent } from './features/compendium/compendium.component';
import { ConstructionCompendiumComponent } from './features/compendium/construction-compendium/construction-compendium.component';
import { TrophyCompendiumComponent } from './features/compendium/trophy-compendium/trophy-compendium.component';
import { TileCompendiumComponent } from './features/compendium/tile-compendium/tile-compendium.component';
import { RandomEncounterCompendiumComponent } from './features/compendium/random-encounter-compendium/random-encounter-compendium.component';
import { TileFeatureCompendiumComponent } from './features/compendium/tile-features-compendium/tile-features-compendium.component';
import { ChroniclerComponent } from './features/chronicler/chronicler.component';
import { ChronicleDetailComponent } from './features/chronicler/chronicle-detail/chronicle-detail.component';
import { ConfigurationComponent } from './features/configuration/configuration.component';

export const routes: AppRoutes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
    showInNav: true,
  },
  {
    title: 'Rules',
    path: 'rules',
    component: RulesComponent,
    showInNav: true,
  },
  {
    title: 'Chronicler',
    path: 'chronicler',
    component: ChroniclerComponent,
    showInNav: true,
  },
  {
    title: 'Chronicle Detail',
    path: 'chronicler/:id',
    component: ChronicleDetailComponent,
    showInNav: false,
  },
  {
    title: 'Compendium',
    path: 'compendium',
    component: CompendiumComponent,
    showInNav: true,
    children: [
      {
        path: 'tiles',
        title: 'Tiles',
        component: TileCompendiumComponent,
      },
      {
        path: 'construction',
        title: 'Constructions',
        component: ConstructionCompendiumComponent,
      },
      {
        path: 'trophies',
        title: 'Trophies',
        component: TrophyCompendiumComponent,
      },
      {
        path: 'random-encounters',
        title: 'Random Encounters',
        component: RandomEncounterCompendiumComponent,
      },
      {
        path: 'tile-features',
        title: 'Tile Features',
        component: TileFeatureCompendiumComponent,
      },
    ],
  },
  {
    title: 'Generators',
    path: 'generators',
    component: GeneratorsComponent,
    showInNav: true,
  },
  {
    title: 'Configuration',
    path: 'configuration',
    component: ConfigurationComponent,
    showInNav: true,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
