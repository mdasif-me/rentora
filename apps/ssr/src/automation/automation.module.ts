import { Module } from '@nestjs/common';
import { AutomationListeners } from './automation.listeners.js';

@Module({
  providers: [AutomationListeners],
})
export class AutomationModule {}
