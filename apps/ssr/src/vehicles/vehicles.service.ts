import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Vehicle } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll(
    category?: string,
    searchTerm?: string,
    location?: string,
  ): Promise<Vehicle[]> {
    const where: Prisma.VehicleWhereInput = {};

    if (category) {
      where.category = {
        OR: [
          { id: category },
          { name: { equals: category, mode: 'insensitive' } },
          { slug: { equals: category, mode: 'insensitive' } },
        ],
      };
    }

    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { type: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    const vehicles = await this.prisma.vehicle.findMany({
      where,
      include: { category: true },
    });
    return vehicles.map((v): Vehicle => ({
      ...v,
      image: v.image ?? undefined,
      transmission: v.transmission as 'Auto' | 'Manual',
      category: v.category
        ? {
            id: v.category.id,
            name: v.category.name,
            slug: v.category.slug,
            isActive: v.category.isActive,
            order: v.category.order,
            image: v.category.image ?? undefined,
            description: v.category.description ?? undefined,
          }
        : undefined,
    }));
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return {
      ...vehicle,
      image: vehicle.image ?? undefined,
      transmission: vehicle.transmission as 'Auto' | 'Manual',
      category: vehicle.category
        ? {
            id: vehicle.category.id,
            name: vehicle.category.name,
            slug: vehicle.category.slug,
            isActive: vehicle.category.isActive,
            order: vehicle.category.order,
            image: vehicle.category.image ?? undefined,
            description: vehicle.category.description ?? undefined,
          }
        : undefined,
    };
  }

  async create(
    data: Prisma.VehicleUncheckedCreateInput,
    file?: any,
  ): Promise<Vehicle> {
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
      include: { category: true },
    });

    return {
      ...vehicle,
      image: vehicle.image ?? undefined,
      transmission: vehicle.transmission as 'Auto' | 'Manual',
      category: vehicle.category
        ? {
            id: vehicle.category.id,
            name: vehicle.category.name,
            slug: vehicle.category.slug,
            isActive: vehicle.category.isActive,
            order: vehicle.category.order,
            image: vehicle.category.image ?? undefined,
            description: vehicle.category.description ?? undefined,
          }
        : undefined,
    };
  }
}
