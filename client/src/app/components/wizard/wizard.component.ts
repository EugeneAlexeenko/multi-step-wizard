import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardService } from '../../services/wizard.service';
import { WizardStep } from '../../models/wizard-step.model';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent implements OnInit {
  steps: WizardStep[] = [];

  constructor(private wizardService: WizardService) { }

  ngOnInit(): void {
    this.wizardService.getWizardSteps().subscribe(steps => {
      this.steps = steps;
    });
  }

}

