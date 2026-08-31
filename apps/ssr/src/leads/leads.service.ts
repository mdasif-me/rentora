import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { Lead as PrismaLead } from '@prisma/client';
import type { Lead } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly prisma: PrismaService,
  ) {}

  async createLead(data: CreateLeadDto): Promise<Lead> {
    const newLead: PrismaLead = await this.prisma.lead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        vehicleId: data.vehicleId,
        pickUpLocation: data.pickUpLocation,
        dropOffLocation: data.dropOffLocation,
        pickUpDate: new Date(data.pickUpDate),
        dropOffDate: new Date(data.dropOffDate),
      },
    });

    this.logger.log(
      `New lead created for ${newLead.firstName} ${newLead.lastName}`,
    );

    const mappedLead: Lead = {
      ...newLead,
      pickUpDate: newLead.pickUpDate.toISOString(),
      dropOffDate: newLead.dropOffDate.toISOString(),
    };

    this.eventEmitter.emit('lead.created', mappedLead);

    return mappedLead;
  }

  async getLeads(): Promise<Lead[]> {
    const leads = await this.prisma.lead.findMany({
      include: {
        vehicle: {
          include: {
            category: true,
          },
        },
      },
    });
    return leads.map((l): Lead => ({
      ...l,
      pickUpDate: l.pickUpDate.toISOString(),
      dropOffDate: l.dropOffDate.toISOString(),
      vehicle: l.vehicle
        ? {
            ...l.vehicle,
            image: l.vehicle.image ?? undefined,
            transmission: l.vehicle.transmission as 'Auto' | 'Manual',
            category: l.vehicle.category
              ? {
                  id: l.vehicle.category.id,
                  name: l.vehicle.category.name,
                  slug: l.vehicle.category.slug,
                  isActive: l.vehicle.category.isActive,
                  order: l.vehicle.category.order,
                  image: l.vehicle.category.image ?? undefined,
                  description: l.vehicle.category.description ?? undefined,
                }
              : undefined,
          }
        : undefined,
    }));
  }

  async updateStatus(id: string, status: string): Promise<Lead> {
    const updated = await this.prisma.lead.update({
      where: { id },
      data: { status },
      include: {
        vehicle: {
          include: {
            category: true,
          },
        },
      },
    });

    this.logger.log(`Lead ${id} status updated to ${status}`);

    return {
      ...updated,
      pickUpDate: updated.pickUpDate.toISOString(),
      dropOffDate: updated.dropOffDate.toISOString(),
      vehicle: updated.vehicle
        ? {
            ...updated.vehicle,
            image: updated.vehicle.image ?? undefined,
            transmission: updated.vehicle.transmission as 'Auto' | 'Manual',
            category: updated.vehicle.category
              ? {
                  id: updated.vehicle.category.id,
                  name: updated.vehicle.category.name,
                  slug: updated.vehicle.category.slug,
                  isActive: updated.vehicle.category.isActive,
                  order: updated.vehicle.category.order,
                  image: updated.vehicle.category.image ?? undefined,
                  description:
                    updated.vehicle.category.description ?? undefined,
                }
              : undefined,
          }
        : undefined,
    };
  }
}
