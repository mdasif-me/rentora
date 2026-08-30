import { Injectable } from '@nestjs/common';
import type { BestSeller, DashboardStats, Transaction } from '@rentora/types';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<DashboardStats> {
    const stats = await this.prisma.dashboardStat.findFirst();
    const bestSellers = await this.getBestSellers();
    const recentTransactions = await this.getTransactions();
    const salesChartData = await this.prisma.salesChartData.findMany();
    const salesByCountry = await this.prisma.salesByCountry.findMany();

    return {
      weeklyEarnings: {
        value: stats?.weeklyEarnings || 0,
        change: stats?.weeklyEarningsPct || 0,
      },
      totalSales: {
        value: stats?.totalSales || 0,
        change: stats?.totalSalesPct || 0,
      },
      purchasedGoods: {
        value: stats?.purchasedGoods || 0,
        change: stats?.purchasedGoodsPct || 0,
      },
      bestSellers,
      recentTransactions,
      salesChartData,
      salesByCountry,
    };
  }

  async getTransactions(): Promise<Transaction[]> {
    const tx = await this.prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
    // map the Prisma type to Transaction which expects date as string and status as specific literal
    return tx.map((t: any) => ({
      ...t,
      image: t.image ?? undefined,
      date: t.date.toISOString(),
      status: t.status as Transaction['status'],
    }));
  }

  async getBestSellers(): Promise<BestSeller[]> {
    const bestSellers = await this.prisma.bestSeller.findMany({ take: 3 });
    return bestSellers.map((b: any) => ({
      ...b,
      image: b.image ?? undefined,
    }));
  }
}
