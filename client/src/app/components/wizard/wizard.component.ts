import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WizardService } from '../../services/wizard.service';
import { WizardStep } from '../../models/wizard-step.model';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent implements OnInit {
  steps: WizardStep[] = [];
  error: string | null = null;

  currentStepIndex = 0;
  wizardForm: FormGroup;

  constructor(private wizardService: WizardService, private formBuilder: FormBuilder) {
    this.wizardForm = this.formBuilder.group({});
  }

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
        this.buildForm();
      });
  }

  buildForm() {
    this.steps.forEach(step => {
      step.questions.forEach(question => {
        this.wizardForm.addControl(question.key, this.formBuilder.control(''));
      });
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

  onSubmit() {
    console.log(this.wizardForm.value);
  }
}

