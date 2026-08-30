import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Vehicle as PrismaVehicle } from '@prisma/client';
import type { Vehicle } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll(category?: string, searchTerm?: string): Promise<Vehicle[]> {
    const where: Prisma.VehicleWhereInput = {};

    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { type: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const vehicles: PrismaVehicle[] = await this.prisma.vehicle.findMany({
      where,
    });
    return vehicles.map((v: PrismaVehicle): Vehicle => ({
      ...v,
      image: v.image ?? undefined,
      transmission: v.transmission as 'Auto' | 'Manual',
    }));
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle: PrismaVehicle | null = await this.prisma.vehicle.findUnique({
      where: { id },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return {
      ...vehicle,
      image: vehicle.image ?? undefined,
      transmission: vehicle.transmission as 'Auto' | 'Manual',
    };
  }

  async create(data: Prisma.VehicleCreateInput, file?: any): Promise<Vehicle> {
    let imageUrl: string | undefined;

    if (file) {
      const uploadedUrl = await this.supabaseService.uploadImage(file);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        ...data,
        image: imageUrl,
      },
    });

    return {
      ...vehicle,
      image: vehicle.image ?? undefined,
      transmission: vehicle.transmission as 'Auto' | 'Manual',
    };
  }
}
