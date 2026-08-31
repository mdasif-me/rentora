import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import type { Lead } from '@rentora/types';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { LeadsService } from './leads.service.js';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Leads')
@Controller({
  path: 'leads',
  version: '1',
})
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead (vehicle booking request)' })
  async createLead(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadsService.createLead(createLeadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  async getLeads(): Promise<Lead[]> {
    return this.leadsService.getLeads();
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update lead status (Approve or Reject)' })
  async updateLeadStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Lead> {
    return this.leadsService.updateStatus(id, status);
  }
}
