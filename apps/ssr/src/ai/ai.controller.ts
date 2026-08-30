import { Body, Controller, Post } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { AiService } from './ai.service.js';
import { RecommendVehiclesDto } from './dto/recommend-vehicles.dto.js';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommend(
    @Body() dto: RecommendVehiclesDto,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    return this.aiService.recommendVehicles(dto.prompt);
  }
}
