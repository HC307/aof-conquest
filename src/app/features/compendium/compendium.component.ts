import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PanelComponent } from '../../components/panel/panel.component';

@Component({
  selector: 'app-compendium',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './compendium.component.html',
  styleUrl: './compendium.component.scss',
})
export class CompendiumComponent implements OnInit {
  childRoutes: { path: string; title?: string }[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const currentRoute = this.router.config.find(
      (r) => r.path === 'compendium'
    );

    if (currentRoute && currentRoute.children) {
      this.childRoutes = currentRoute.children.map((child: Route) => ({
        path: child.path ? child.path : 'error',
        title: child.title ? child.title.toString() : child.path, // fallback to path if title missing
      }));
    }
  }
}
