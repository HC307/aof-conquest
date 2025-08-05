import { Route } from '@angular/router';

export interface AppRoute extends Route {
  showInNav?: boolean;
}

export type AppRoutes = AppRoute[];