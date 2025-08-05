import {Component} from '@angular/core';
import {routes} from '../../../../app.routes';
import {AppRoute} from '../../../../app.routes.interface';
import {PanelComponent} from '../../../../components/panel/panel.component';
import {SideNavButtonComponent} from './side-nav-button/side-nav-button.component';

@Component({
  selector: 'app-nav-bar',
  imports: [
    PanelComponent,
    SideNavButtonComponent
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  protected readonly routes = routes;
  
  isRouteVisible(route: AppRoute): boolean {
    // Show route if showInNav is true or undefined (default to true for backwards compatibility)
    return route.showInNav !== false;
  }
}
