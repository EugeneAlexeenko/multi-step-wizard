import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { WizardStep } from './types';

@Injectable()
export class WizardService {
  getWizardSteps(): WizardStep[] {
    const configPath = join(__dirname, './data/wizard-config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf8'));

    return config;
  }
}
