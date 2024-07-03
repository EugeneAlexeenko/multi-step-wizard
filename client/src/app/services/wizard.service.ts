import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WizardStep } from '../models/wizard-step.model';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private configUrl = 'http://localhost:3000/wizard/steps';

  constructor(private http: HttpClient) { }

  getWizardSteps(): Observable<WizardStep[]> {
    return this.http.get<WizardStep[]>(this.configUrl);
  }
}
