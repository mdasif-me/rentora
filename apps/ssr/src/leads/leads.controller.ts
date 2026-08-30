import { Body, Controller, Get, Post } from '@nestjs/common';
import type { Lead } from '@rentora/types';
import { LeadsService } from './leads.service.js';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async createLead(@Body() body: any): Promise<Lead> {
    return this.leadsService.createLead(body);
  }

  @Get()
  async getLeads(): Promise<Lead[]> {
    return this.leadsService.getLeads();
  }
}
