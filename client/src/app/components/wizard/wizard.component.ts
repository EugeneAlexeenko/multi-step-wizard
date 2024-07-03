import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
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
        if (question.type === 'multi-choice') {
          const formArray = this.formBuilder.array(
            question.options!.map(() => this.formBuilder.control(false)));

          this.wizardForm.addControl(question.key, formArray);
        } else {
          this.wizardForm.addControl(question.key, this.formBuilder.control(''));
        }
      });
    });
  }

  onCheckboxChange(event: any, controlName: string, index: number): void {
    const formArray: FormArray = this.wizardForm.get(controlName) as FormArray;
    formArray.at(index).setValue(event.target.checked);
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
    // TODO: validate form
    const formValues = this.wizardForm.value;
    const output = { ...formValues };

    // Convert FormArray values to arrays of selected options
    this.steps.forEach(step => {
      step.questions.forEach(question => {
        if (question.type === 'multi-choice') {
          const selectedOptions = question.options!.filter((option, index) => formValues[question.key][index]);
          output[question.key] = selectedOptions;
        }
      });
    });

    console.log(output);
    // TODO: send output to server, display the result
  }
}

