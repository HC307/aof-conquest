import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RulesComponent } from './features/rules/rules.component';
import { GeneratorsComponent } from './features/generators/generators.component';
import { CompendiumComponent } from './features/compendium/compendium.component';
import { ConstructionCompendiumComponent } from './features/compendium/construction-compendium/construction-compendium.component';
import { TrophyCompendiumComponent } from './features/compendium/trophy-compendium/trophy-compendium.component';
import { TileCompendiumComponent } from './features/compendium/tile-compendium/tile-compendium.component';
import { RandomEncounterCompendiumComponent } from './features/compendium/random-encounter-compendium/random-encounter-compendium.component';
import { TileFeatureCompendiumComponent } from './features/compendium/tile-features-compendium/tile-features-compendium.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent,
  },
  {
    title: 'Rules',
    path: 'rules',
    component: RulesComponent,
  },
  {
    title: 'Compendium',
    path: 'compendium',
    component: CompendiumComponent,
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
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
