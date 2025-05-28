import { Component, Input } from '@angular/core';
import { Rule } from '../../domain/model/rule.interface';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-rule-display',
  imports: [PanelComponent],
  templateUrl: './rule-display.component.html',
  styleUrl: './rule-display.component.scss',
})
export class RuleDisplayComponent {
  @Input() data?: Rule;
}
