import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service.js';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommend(@Body('prompt') prompt: string) {
    if (!prompt) {
      return { explanation: 'Please provide a prompt.', vehicles: [] };
    }
    return this.aiService.recommendVehicles(prompt);
  }
}
