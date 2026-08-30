import { Injectable, Logger } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { VehiclesService } from '../vehicles/vehicles.service.js';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly vehiclesService: VehiclesService) {}

  async recommendVehicles(prompt: string): Promise<{
    explanation: string;
    vehicles: Vehicle[];
  }> {
    this.logger.log(`Received AI prompt: ${prompt}`);

    const vehicles = await this.vehiclesService.findAll();
    const promptLower = prompt.toLowerCase();

    // Very basic mock AI matching logic (since we don't have an LLM API Key here yet)
    // If user provides a key, we can swap this for a real API call.
    let matchedVehicles = [...vehicles];

    const seatsMatch = promptLower.match(/(\d+)\s*(people|seats|passengers)/);
    if (seatsMatch) {
      const seats = parseInt(seatsMatch[1], 10);
      matchedVehicles = matchedVehicles.filter((v) => v.seats >= seats);
    }

    if (promptLower.includes('suv')) {
      matchedVehicles = matchedVehicles.filter(
        (v) => v.type.toLowerCase() === 'suv',
      );
    } else if (promptLower.includes('sport')) {
      matchedVehicles = matchedVehicles.filter(
        (v) => v.type.toLowerCase() === 'sport',
      );
    } else if (
      promptLower.includes('luxury') ||
      promptLower.includes('sedan')
    ) {
      matchedVehicles = matchedVehicles.filter(
        (v) => v.category.toLowerCase() === 'luxury',
      );
    }

    const budgetMatch =
      promptLower.match(/under\s*\$*(\d+)/) ||
      promptLower.match(/budget.*\b(\d+)/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1], 10);
      matchedVehicles = matchedVehicles.filter((v) => v.pricePerDay <= budget);
    }

    let explanation = 'Here are some vehicles based on your request.';
    if (matchedVehicles.length === 0) {
      explanation =
        "I'm sorry, we couldn't find any vehicles matching those exact preferences. Here are our popular options instead.";
      matchedVehicles = vehicles.slice(0, 3);
    } else {
      explanation = `Based on your request, I found ${matchedVehicles.length} vehicle(s) that match your criteria.`;
    }

    return {
      explanation,
      vehicles: matchedVehicles,
    };
  }
}
