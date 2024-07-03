export interface Question {
  type: 'input' | 'multi-choice' | 'single-choice' | 'numeric';
  label: string;
  key: string;
  options?: string[];
  validators: string[];
}
