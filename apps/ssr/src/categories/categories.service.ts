import { Injectable, NotFoundException } from '@nestjs/common';
import type { Category } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
    return categories.map((c) => ({
      ...c,
      image: c.image ?? undefined,
      description: c.description ?? undefined,
    }));
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return {
      ...category,
      image: category.image ?? undefined,
      description: category.description ?? undefined,
    };
  }

  async create(
    data: any, // Using any temporarily for DTO parsing
    file?: any,
  ): Promise<Category> {
    let imageUrl: string | undefined;

    if (file) {
      const uploadedUrl = await this.supabaseService.uploadImage(
        file,
        'assets',
      );
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const category = await this.prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        slug,
        image: imageUrl,
        isActive:
          data.isActive !== undefined ? String(data.isActive) === 'true' : true,
        order: data.order !== undefined ? Number(data.order) : 0,
      },
    });

    return {
      ...category,
      image: category.image ?? undefined,
      description: category.description ?? undefined,
    };
  }

  async update(id: string, data: any, file?: any): Promise<Category> {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    let imageUrl: string | undefined = existing.image ?? undefined;

    if (file) {
      const uploadedUrl = await this.supabaseService.uploadImage(
        file,
        'assets',
      );
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const slug = data.name
      ? data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      : existing.slug;

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name, slug }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.isActive !== undefined && {
          isActive: String(data.isActive) === 'true',
        }),
        ...(data.order !== undefined && { order: Number(data.order) }),
        image: imageUrl,
      },
    });

    return {
      ...category,
      image: category.image ?? undefined,
      description: category.description ?? undefined,
    };
  }

  async delete(id: string): Promise<void> {
    const existing = await this.prisma.category.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.prisma.category.delete({ where: { id } });
  }
}
