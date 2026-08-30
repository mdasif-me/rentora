import { Controller, Get } from '@nestjs/common';
import type { BestSeller, DashboardStats, Transaction } from '@rentora/types';
import { DashboardService } from './dashboard.service.js';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getStats(): Promise<DashboardStats> {
    return this.dashboardService.getStats();
  }

  @Get('transactions')
  async getTransactions(): Promise<Transaction[]> {
    return this.dashboardService.getTransactions();
  }

  @Get('bestsellers')
  async getBestSellers(): Promise<BestSeller[]> {
    return this.dashboardService.getBestSellers();
  }
}
