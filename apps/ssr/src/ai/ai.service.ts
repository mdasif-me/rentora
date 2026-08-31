import { Injectable, Logger } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';
import { VehiclesService } from '../vehicles/vehicles.service.js';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly prisma: PrismaService,
  ) {}

  async recommendVehicles(
    prompt: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const sanitizedPrompt = prompt.trim().slice(0, 300);
    this.logger.log(
      `Calling Gemini AI engine for prompt: "${sanitizedPrompt}"`,
    );

    const apiKey = process.env.AI_API_KEY && process.env.AI_API_KEY.trim();
    if (!apiKey) {
      this.logger.warn(
        'AI_API_KEY is not configured in .env. Returning empty recommendations.',
      );
      return {
        explanation:
          'AI Search is currently unavailable because the API key is not configured in .env.',
        vehicles: [],
      };
    }

    try {
      const allVehicles = await this.vehiclesService.findAll();
      return await this.callGeminiApi(sanitizedPrompt, allVehicles, apiKey);
    } catch (err: unknown) {
      this.logger.error('Gemini AI Search API error', err);
      return {
        explanation:
          'I encountered an error querying the Gemini AI recommendation engine. Please ensure your Gemini API key is valid.',
        vehicles: [],
      };
    }
  }

  async runRecommendationWithKey(
    prompt: string,
    apiKey: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const sanitizedPrompt = prompt.trim().slice(0, 300);
    const allVehicles = await this.vehiclesService.findAll();
    return this.callGeminiApi(sanitizedPrompt, allVehicles, apiKey);
  }

  private async callGeminiApi(
    prompt: string,
    allVehicles: Vehicle[],
    apiKey: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const compactCatalog = allVehicles.map((v) => ({
      id: v.id,
      name: v.name,
      type: v.type,
      category: v.category?.name,
      pricePerDay: v.pricePerDay,
      transmission: v.transmission,
      location: v.location,
    }));
    this.logger.log('Querying Gemini API directly...');
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are a car rental recommendation assistant. Given a vehicle catalog JSON and user prompt, return a JSON object with keys "explanation" (string) and "vehicleIds" (string array of matching vehicle IDs).\n\nCatalog: ${JSON.stringify(compactCatalog)}\nPrompt: "${prompt}"\n\nReturn ONLY the raw JSON object. Do not wrap it in markdown code blocks.`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini API HTTP error ${response.status}`);
    }
    const data = (await response.json()) as any;
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';

    text = text
      .replace(/```json\s?/g, '')
      .replace(/```\s?/g, '')
      .trim();

    const parsed = JSON.parse(text) as {
      explanation?: string;
      vehicleIds?: string[];
    };

    const explanation =
      parsed.explanation ??
      'Here are the recommended vehicles for your request.';
    const matchedIds = parsed.vehicleIds ?? [];
    const vehicles = allVehicles.filter((v) => matchedIds.includes(v.id));

    return {
      explanation,
      vehicles,
    };
  }
}
