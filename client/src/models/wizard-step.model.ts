import { Question } from './question.model';

export interface WizardStep {
  step: number;
  title: string;
  questions: Question[];
}
