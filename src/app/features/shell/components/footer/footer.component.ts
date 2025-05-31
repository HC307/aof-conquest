import { Component } from '@angular/core';
import { PanelComponent } from '../../../../components/panel/panel.component';
import { LinkComponent } from '../../../../components/link/link.component';

@Component({
  selector: 'app-footer',
  imports: [PanelComponent, LinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
