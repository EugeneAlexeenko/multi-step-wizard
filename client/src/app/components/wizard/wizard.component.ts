import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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
  error: string | null = null;

  currentStepIndex = 0;

  constructor(private wizardService: WizardService) { }

  ngOnInit(): void {
    this.wizardService.getWizardSteps().pipe(
      catchError(error => {
        this.error = 'Error loading wizard steps';
        console.error('Error loading wizard steps:', error);
        return of([])
      })
    ).
      subscribe(steps => {
        this.steps = steps;
      });
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }
}

