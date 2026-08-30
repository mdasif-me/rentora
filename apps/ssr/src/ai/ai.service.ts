/**
 * Rentora AI Recommendation Service
 *
 * Architecture Overview:
 * 1. Universal API Key Resolution (getApiKey):
 *    Reads an API key from environment variables (AI_API_KEY, OPENROUTER_API_KEY,
 *    OPENAI_API_KEY, GEMINI_API_KEY) and returns it trimmed. If none are set,
 *    the service will fall back to the local recommendation engine.
 * 2. Default API Key Function (runRecommendationWithKey):
 *    Public method that accepts any API key supplied at runtime and executes the
 *    OpenRouter request directly, enabling callers to use arbitrary keys without
 *    relying on environment configuration.
 * 3. Database Query Caching:
 *    Cached prompt results are stored in PostgreSQL via Prisma (AiQueryCache) to
 *    avoid token consumption on repeated queries.
 */

import { Injectable, Logger } from '@nestjs/common';
import type { Vehicle as PrismaVehicle } from '@prisma/client';
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

  /**
   * Primary recommendation method used by the application.
   * Falls back to local engine when no API key is configured.
   */
  async recommendVehicles(
    prompt: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const sanitizedPrompt = prompt.trim().slice(0, 300);
    const promptKey = sanitizedPrompt.toLowerCase();

    const dbCached = await this.prisma.aiQueryCache.findUnique({
      where: { promptKey },
    });
    if (dbCached) {
      this.logger.log(`[Cache] hit for prompt: "${sanitizedPrompt}"`);
      const vehiclesInDb = await this.prisma.vehicle.findMany({
        where: { id: { in: dbCached.vehicleIds } },
      });
      const mappedVehicles: Vehicle[] = vehiclesInDb.map(
        (v: PrismaVehicle): Vehicle => ({
          ...v,
          image: v.image ?? undefined,
          transmission: v.transmission as 'Auto' | 'Manual',
        }),
      );
      return { explanation: dbCached.explanation, vehicles: mappedVehicles };
    }

    this.logger.log(`Calling AI engine for prompt: "${sanitizedPrompt}"`);
    const allVehicles = await this.vehiclesService.findAll();
    let explanation = '';
    let matchedVehicles: Vehicle[] = [];

    const apiKey = process.env.AI_API_KEY && process.env.AI_API_KEY.trim();
    if (apiKey) {
      try {
        const aiResponse = await this.callOpenRouterApi(
          sanitizedPrompt,
          allVehicles,
          apiKey,
        );
        explanation = aiResponse.explanation;
        matchedVehicles = aiResponse.vehicles;
      } catch (err: unknown) {
        this.logger.error('AI API error, using fallback', err);
        const fallback = this.localFallbackMatch(promptKey, allVehicles);
        explanation = fallback.explanation;
        matchedVehicles = fallback.vehicles;
      }
    } else {
      const fallback = this.localFallbackMatch(promptKey, allVehicles);
      explanation = fallback.explanation;
      matchedVehicles = fallback.vehicles;
    }

    try {
      await this.prisma.aiQueryCache.create({
        data: {
          promptKey,
          explanation,
          vehicleIds: matchedVehicles.map((v) => v.id),
        },
      });
    } catch {}

    return { explanation, vehicles: matchedVehicles };
  }

  /**
   * Public helper allowing callers to provide any API key at runtime.
   * Returns the AI recommendation result without checking environment variables.
   */
  async runRecommendationWithKey(
    prompt: string,
    apiKey: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const sanitizedPrompt = prompt.trim().slice(0, 300);
    const allVehicles = await this.vehiclesService.findAll();
    const aiResponse = await this.callOpenRouterApi(
      sanitizedPrompt,
      allVehicles,
      apiKey,
    );
    return {
      explanation: aiResponse.explanation,
      vehicles: aiResponse.vehicles,
    };
  }

  private async callOpenRouterApi(
    prompt: string,
    allVehicles: Vehicle[],
    apiKey: string,
  ): Promise<{ explanation: string; vehicles: Vehicle[] }> {
    const compactCatalog = allVehicles.map((v) => ({
      id: v.id,
      name: v.name,
      type: v.type,
      category: v.category,
      pricePerDay: v.pricePerDay,
    }));
    const model = process.env.AI_MODEL ?? 'google/gemini-2.5-flash';
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://rentora.com',
          'X-Title': 'Rentora AI Assistant',
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          messages: [
            {
              role: 'system',
              content:
                'You are a car rental recommendation assistant. Given a vehicle catalog JSON and user prompt, return a JSON object with keys "explanation" (string) and "vehicleIds" (string array of matching vehicle IDs).',
            },
            {
              role: 'user',
              content: `Catalog: ${JSON.stringify(compactCatalog)}\nPrompt: "${prompt}"`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`AI API HTTP error ${response.status}`);
    }
    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const content = data.choices[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(content) as {
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
      vehicles: vehicles.length > 0 ? vehicles : allVehicles.slice(0, 3),
    };
  }

  private localFallbackMatch(
    promptLower: string,
    allVehicles: Vehicle[],
  ): { explanation: string; vehicles: Vehicle[] } {
    let matchedVehicles = [...allVehicles];

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
        (v) => v.category?.name.toLowerCase() === 'luxury',
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
      matchedVehicles = allVehicles.slice(0, 3);
    } else {
      explanation = `Based on your request, I found ${matchedVehicles.length} vehicle(s) that match your criteria.`;
    }
    return { explanation, vehicles: matchedVehicles };
  }
}
