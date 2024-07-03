import { Controller, Get } from '@nestjs/common';
import { WizardService } from './wizard.service';
import { WizardStep } from './types';

@Controller('wizard')
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Get('steps')
  getWizardSteps(): WizardStep[] {
    return this.wizardService.getWizardSteps();
  }
}
