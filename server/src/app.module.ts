import { Module } from '@nestjs/common';
import { WizardModule } from './wizard/wizard.module';

@Module({
  imports: [WizardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
