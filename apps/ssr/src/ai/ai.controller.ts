import { Body, Controller, Post } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { AiService } from './ai.service.js';
import { RecommendVehiclesDto } from './dto/recommend-vehicles.dto.js';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AI Recommendations')
@Controller({
  path: 'ai',
  version: '1',
})
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  @ApiOperation({
    summary: 'Get AI-powered vehicle recommendations based on natural language',
  })
  async recommend(
    @Body() dto: RecommendVehiclesDto,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    return this.aiService.recommendVehicles(dto.prompt);
  }
}
