import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-nav-button',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './side-nav-button.component.html',
  styleUrl: './side-nav-button.component.scss',
})
export class SideNavButtonComponent {
  @Input() route? = '';
}
