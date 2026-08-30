import { Module } from '@nestjs/common';
import { VehiclesModule } from '../vehicles/vehicles.module.js';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';

@Module({
  imports: [VehiclesModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
