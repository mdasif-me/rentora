import { Controller, Get } from '@nestjs/common';
import type { BestSeller, DashboardStats, Transaction } from '@rentora/types';
import { DashboardService } from './dashboard.service.js';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller({
  path: 'dashboard',
  version: '1',
})
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get high-level dashboard statistics' })
  async getStats(): Promise<DashboardStats> {
    return this.dashboardService.getStats();
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get recent transactions' })
  async getTransactions(): Promise<Transaction[]> {
    return this.dashboardService.getTransactions();
  }

  @Get('bestsellers')
  @ApiOperation({ summary: 'Get best selling vehicles' })
  async getBestSellers(): Promise<BestSeller[]> {
    return this.dashboardService.getBestSellers();
  }
}
