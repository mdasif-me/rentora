import { Injectable, NotFoundException } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string, searchTerm?: string): Promise<Vehicle[]> {
    const where: any = {};

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { type: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const vehicles = await this.prisma.vehicle.findMany({ where });
    return vehicles.map((v) => ({
      ...v,
      image: v.image ?? undefined,
      transmission: v.transmission as 'Auto' | 'Manual',
    }));
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return {
      ...vehicle,
      image: vehicle.image ?? undefined,
      transmission: vehicle.transmission as 'Auto' | 'Manual',
    };
  }
}
