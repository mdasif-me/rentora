import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { RentalDashboardStats } from './dashboard.service.js';
import { DashboardService } from './dashboard.service.js';

@ApiTags('Dashboard')
@Controller({
  path: 'dashboard',
  version: '1',
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get fully-dynamic dashboard stats — earnings, leads, vehicles, multi-range chart' })
  async getStats(): Promise<RentalDashboardStats> {
    return this.dashboardService.getStats();
  }
}
