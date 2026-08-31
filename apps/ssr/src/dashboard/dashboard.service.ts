import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface ChartPoint {
  label: string;
  count: number;
}

export interface RentalDashboardStats {
  
  weeklyEarnings: number;
  
  totalLeads: number;
  
  approvedLeads: number;
  
  rejectedLeads: number;
  
  pendingLeads: number;
  
  totalVehicles: number;
  
  minPrice: number;
  
  maxPrice: number;
  
  chart: {
    hourly: ChartPoint[]; 
    daily: ChartPoint[]; 
    monthly: ChartPoint[]; 
    quarterly: ChartPoint[]; 
  };
  
  recentLeads: RecentLeadItem[];
}

export interface RecentLeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleName: string;
  vehiclePrice: number;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  status: string;
  createdAt: string;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<RentalDashboardStats> {
    const now = new Date();

    
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const approvedThisWeek = await this.prisma.lead.findMany({
      where: { status: 'APPROVED', createdAt: { gte: weekStart } },
      include: { vehicle: { select: { pricePerDay: true } } },
    });
    const weeklyEarnings = approvedThisWeek.reduce(
      (sum, l) => sum + (l.vehicle?.pricePerDay ?? 0),
      0,
    );

    
    const [totalLeads, approvedLeads, rejectedLeads, pendingLeads] =
      await Promise.all([
        this.prisma.lead.count(),
        this.prisma.lead.count({ where: { status: 'APPROVED' } }),
        this.prisma.lead.count({ where: { status: 'REJECTED' } }),
        this.prisma.lead.count({ where: { status: 'PENDING' } }),
      ]);

    
    const vehicleAgg = await this.prisma.vehicle.aggregate({
      _count: { id: true },
      _min: { pricePerDay: true },
      _max: { pricePerDay: true },
    });

    
    const hourlyStart = new Date(now);
    hourlyStart.setUTCHours(hourlyStart.getUTCHours() - 23, 0, 0, 0);

    const hourlyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: hourlyStart } },
      select: { createdAt: true },
    });

    const hourlyMap: Record<string, number> = {};
    for (let h = 0; h < 24; h++) {
      const d = new Date(hourlyStart);
      d.setUTCHours(hourlyStart.getUTCHours() + h);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}T${String(d.getUTCHours()).padStart(2, '0')}`;
      hourlyMap[key] = 0;
    }
    for (const lead of hourlyLeads) {
      const d = lead.createdAt;
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}T${String(d.getUTCHours()).padStart(2, '0')}`;
      if (key in hourlyMap) hourlyMap[key]++;
    }
    const hourly: ChartPoint[] = Object.entries(hourlyMap).map(
      ([label, count]) => ({ label, count }),
    );

    
    const dailyStart = new Date(now);
    dailyStart.setUTCDate(dailyStart.getUTCDate() - 29);
    dailyStart.setUTCHours(0, 0, 0, 0);

    const dailyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: dailyStart } },
      select: { createdAt: true },
    });

    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(dailyStart);
      d.setUTCDate(dailyStart.getUTCDate() + i);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      dailyMap[key] = 0;
    }
    for (const lead of dailyLeads) {
      const d = lead.createdAt;
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
      if (key in dailyMap) dailyMap[key]++;
    }
    const daily: ChartPoint[] = Object.entries(dailyMap).map(
      ([label, count]) => ({ label, count }),
    );

    
    const monthlyStart = new Date(now);
    monthlyStart.setUTCMonth(monthlyStart.getUTCMonth() - 11);
    monthlyStart.setUTCDate(1);
    monthlyStart.setUTCHours(0, 0, 0, 0);

    const monthlyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: monthlyStart } },
      select: { createdAt: true },
    });

    const monthlyMap: Record<string, number> = {};
    for (let i = 0; i < 12; i++) {
      const d = new Date(monthlyStart);
      d.setUTCMonth(monthlyStart.getUTCMonth() + i);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
      monthlyMap[key] = 0;
    }
    for (const lead of monthlyLeads) {
      const d = lead.createdAt;
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
      if (key in monthlyMap) monthlyMap[key]++;
    }
    const monthly: ChartPoint[] = Object.entries(monthlyMap).map(
      ([label, count]) => ({ label, count }),
    );

    
    const quarterly = monthly.slice(-3);

    
    const rawLeads = await this.prisma.lead.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { vehicle: true },
    });

    const recentLeads: RecentLeadItem[] = rawLeads.map((l) => ({
      id: l.id,
      name: `${l.firstName} ${l.lastName}`,
      email: l.email,
      phone: l.phone,
      vehicleName: l.vehicle?.name ?? '—',
      vehiclePrice: l.vehicle?.pricePerDay ?? 0,
      pickUpLocation: l.pickUpLocation,
      dropOffLocation: l.dropOffLocation,
      pickUpDate: l.pickUpDate.toISOString(),
      dropOffDate: l.dropOffDate.toISOString(),
      status: l.status,
      createdAt: l.createdAt.toISOString(),
    }));

    return {
      weeklyEarnings,
      totalLeads,
      approvedLeads,
      rejectedLeads,
      pendingLeads,
      totalVehicles: vehicleAgg._count.id,
      minPrice: vehicleAgg._min.pricePerDay ?? 0,
      maxPrice: vehicleAgg._max.pricePerDay ?? 0,
      chart: { hourly, daily, monthly, quarterly },
      recentLeads,
    };
  }
}
