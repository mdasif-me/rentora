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
    const leads: PrismaLead[] = await this.prisma.lead.findMany();
    return leads.map((l: PrismaLead): Lead => ({
      ...l,
      pickUpDate: l.pickUpDate.toISOString(),
      dropOffDate: l.dropOffDate.toISOString(),
    }));
  }
}
