import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WizardComponent],
  template: '<app-wizard></app-wizard>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
