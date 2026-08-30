import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Lead } from '@rentora/types';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { LeadsService } from './leads.service.js';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async createLead(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.createLead(createLeadDto);
  }

  @Get()
  async getLeads(): Promise<Lead[]> {
    return this.leadsService.getLeads();
  }
}
