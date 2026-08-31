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

  /** Admin dashboard chat: answers questions about leads, vehicles, and rental stats */
  async adminChat(prompt: string): Promise<{ answer: string }> {
    const sanitizedPrompt = prompt.trim().slice(0, 500);
    const apiKey = process.env.AI_API_KEY && process.env.AI_API_KEY.trim();

    // Gather live business context
    const [totalLeads, approvedLeads, rejectedLeads, pendingLeads, vehicles] =
      await Promise.all([
        this.prisma.lead.count(),
        this.prisma.lead.count({ where: { status: 'APPROVED' } }),
        this.prisma.lead.count({ where: { status: 'REJECTED' } }),
        this.prisma.lead.count({ where: { status: 'PENDING' } }),
        this.prisma.vehicle.findMany({
          select: { name: true, pricePerDay: true, available: true },
        }),
      ]);

    const weekStart = new Date();
    weekStart.setUTCDate(weekStart.getUTCDate() - 7);
    weekStart.setUTCHours(0, 0, 0, 0);
    const approvedThisWeek = await this.prisma.lead.findMany({
      where: { status: 'APPROVED', createdAt: { gte: weekStart } },
      include: { vehicle: { select: { pricePerDay: true } } },
    });
    const weeklyEarnings = approvedThisWeek.reduce(
      (sum, l) => sum + (l.vehicle?.pricePerDay ?? 0),
      0,
    );

    const recentLeads = await this.prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { vehicle: { select: { name: true } } },
    });

    const context = `
You are an admin assistant for "Rentora", a vehicle rental platform.
Current business snapshot:
- Total leads (rental requests): ${totalLeads}
- Approved leads: ${approvedLeads}
- Rejected leads: ${rejectedLeads}
- Pending leads: ${pendingLeads}
- Weekly earnings (approved leads, last 7 days): $${weeklyEarnings}
- Total vehicles in fleet: ${vehicles.length}
- Available vehicles: ${vehicles.filter((v) => v.available).length}
- Price range: $${Math.min(...vehicles.map((v) => v.pricePerDay))} - $${Math.max(...vehicles.map((v) => v.pricePerDay))} / day
- Recent leads (last 5): ${recentLeads.map((l) => `${l.firstName} ${l.lastName} → ${l.vehicle?.name ?? 'Unknown'} [${l.status}]`).join(', ')}

Answer the admin's question clearly and concisely in plain English. If asked for numbers, provide them exactly from the data above.
Admin question: "${sanitizedPrompt}"
`;

    if (!apiKey) {
      // Fallback: answer from context without AI
      return this.answerFromContext(sanitizedPrompt, {
        totalLeads,
        approvedLeads,
        rejectedLeads,
        pendingLeads,
        weeklyEarnings,
        vehicles,
      });
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: context }] }],
            generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
          }),
        },
      );
      if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
      const data = (await response.json()) as any;
      const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        'No answer generated.';
      return { answer: answer.trim() };
    } catch (err) {
      this.logger.error('Admin chat Gemini error', err);
      return this.answerFromContext(sanitizedPrompt, {
        totalLeads,
        approvedLeads,
        rejectedLeads,
        pendingLeads,
        weeklyEarnings,
        vehicles,
      });
    }
  }

  private answerFromContext(
    prompt: string,
    data: {
      totalLeads: number;
      approvedLeads: number;
      rejectedLeads: number;
      pendingLeads: number;
      weeklyEarnings: number;
      vehicles: { name: string; pricePerDay: number; available: boolean }[];
    },
  ): { answer: string } {
    const p = prompt.toLowerCase();
    if (p.includes('pending'))
      return {
        answer: `You have ${data.pendingLeads} pending lead${data.pendingLeads !== 1 ? 's' : ''} awaiting review.`,
      };
    if (p.includes('approved'))
      return {
        answer: `${data.approvedLeads} lead${data.approvedLeads !== 1 ? 's' : ''} have been approved.`,
      };
    if (p.includes('rejected') || p.includes('cancel'))
      return {
        answer: `${data.rejectedLeads} lead${data.rejectedLeads !== 1 ? 's' : ''} have been rejected.`,
      };
    if (p.includes('earning') || p.includes('revenue'))
      return {
        answer: `Weekly earnings from approved leads: $${data.weeklyEarnings}.`,
      };
    if (p.includes('vehicle') || p.includes('fleet'))
      return {
        answer: `Fleet has ${data.vehicles.length} vehicles, ${data.vehicles.filter((v) => v.available).length} currently available.`,
      };
    return {
      answer: `Rentora summary — Total leads: ${data.totalLeads} (${data.approvedLeads} approved, ${data.rejectedLeads} rejected, ${data.pendingLeads} pending). Weekly earnings: $${data.weeklyEarnings}. Fleet: ${data.vehicles.length} vehicles.`,
    };
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
