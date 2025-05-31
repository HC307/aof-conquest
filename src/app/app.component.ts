import { Component } from '@angular/core';
import { ShellComponent } from './features/shell/shell.component';

@Component({
  selector: 'app-root',
  imports: [ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'aofs-conquest';
}
