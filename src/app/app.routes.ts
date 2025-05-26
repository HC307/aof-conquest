import {Routes} from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {RulesComponent} from './features/rules/rules.component';
import {GeneratorsComponent} from './features/generators/generators.component';
import {CompendiumComponent} from './features/compendium/compendium.component';
import {BuildingsCompendiumComponent} from './features/compendium/buildings-compendium/buildings-compendium.component';
import {TrophiesCompendiumComponent} from './features/compendium/trophies-compendium/trophies-compendium.component';
import {TileCompendiumComponent} from './features/compendium/tile-compendium/tile-compendium.component';

export const routes: Routes = [
  {
    title: 'Home',
    path: 'home',
    component: HomeComponent
  },
  {
    title: 'Rules',
    path: 'rules',
    component: RulesComponent
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
        path: 'buildings',
        title: 'Buildings',
        component: BuildingsCompendiumComponent,
      },
      {
        path: 'trophies',
        title: 'Trophies',
        component: TrophiesCompendiumComponent,
      }
    ]
  },
  {
    title: 'Generators',
    path: 'generators',
    component: GeneratorsComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
