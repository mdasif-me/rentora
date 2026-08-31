import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface ChartPoint {
  label: string;
  count: number;
}

export interface RentalDashboardStats {
  /** Sum of approved leads' vehicle.pricePerDay for leads created in the current week */
  weeklyEarnings: number;
  /** Total leads ever submitted */
  totalLeads: number;
  /** Approved leads count */
  approvedLeads: number;
  /** Rejected leads count */
  rejectedLeads: number;
  /** Pending leads count */
  pendingLeads: number;
  /** Total vehicles in fleet */
  totalVehicles: number;
  /** Lowest pricePerDay */
  minPrice: number;
  /** Highest pricePerDay */
  maxPrice: number;
  /** Chart data keyed by range */
  chart: {
    hourly: ChartPoint[];   // last 24 hours, per hour
    daily: ChartPoint[];    // last 30 days, per day
    monthly: ChartPoint[];  // last 12 months, per month
    quarterly: ChartPoint[]; // last 3 months, per month (same as monthly[last 3])
  };
  /** Latest 10 leads with vehicle details */
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

    // ── 1. Weekly Earnings ────────────────────────────────────────────────────
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

    // ── 2. Counts ─────────────────────────────────────────────────────────────
    const [totalLeads, approvedLeads, rejectedLeads, pendingLeads] =
      await Promise.all([
        this.prisma.lead.count(),
        this.prisma.lead.count({ where: { status: 'APPROVED' } }),
        this.prisma.lead.count({ where: { status: 'REJECTED' } }),
        this.prisma.lead.count({ where: { status: 'PENDING' } }),
      ]);

    // ── 3. Vehicle fleet stats ────────────────────────────────────────────────
    const vehicleAgg = await this.prisma.vehicle.aggregate({
      _count: { id: true },
      _min: { pricePerDay: true },
      _max: { pricePerDay: true },
    });

    // ── 4. Chart: hourly (last 24 h) ──────────────────────────────────────────
    const hourlyStart = new Date(now);
    hourlyStart.setHours(hourlyStart.getHours() - 23, 0, 0, 0);

    const hourlyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: hourlyStart } },
      select: { createdAt: true },
    });

    const hourlyMap: Record<string, number> = {};
    for (let h = 0; h < 24; h++) {
      const d = new Date(hourlyStart);
      d.setHours(hourlyStart.getHours() + h);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}`;
      hourlyMap[key] = 0;
    }
    for (const lead of hourlyLeads) {
      const d = lead.createdAt;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}`;
      if (key in hourlyMap) hourlyMap[key]++;
    }
    const hourly: ChartPoint[] = Object.entries(hourlyMap).map(([label, count]) => ({ label, count }));

    // ── 5. Chart: daily (last 30 days) ────────────────────────────────────────
    const dailyStart = new Date(now);
    dailyStart.setDate(dailyStart.getDate() - 29);
    dailyStart.setHours(0, 0, 0, 0);

    const dailyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: dailyStart } },
      select: { createdAt: true },
    });

    const dailyMap: Record<string, number> = {};
    for (let i = 0; i < 30; i++) {
      const d = new Date(dailyStart);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      dailyMap[key] = 0;
    }
    for (const lead of dailyLeads) {
      const key = lead.createdAt.toISOString().slice(0, 10);
      if (key in dailyMap) dailyMap[key]++;
    }
    const daily: ChartPoint[] = Object.entries(dailyMap).map(([label, count]) => ({ label, count }));

    // ── 6. Chart: monthly (last 12 months) ────────────────────────────────────
    const monthlyStart = new Date(now);
    monthlyStart.setMonth(monthlyStart.getMonth() - 11);
    monthlyStart.setDate(1);
    monthlyStart.setHours(0, 0, 0, 0);

    const monthlyLeads = await this.prisma.lead.findMany({
      where: { createdAt: { gte: monthlyStart } },
      select: { createdAt: true },
    });

    const monthlyMap: Record<string, number> = {};
    for (let i = 0; i < 12; i++) {
      const d = new Date(monthlyStart);
      d.setMonth(d.getMonth() + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyMap[key] = 0;
    }
    for (const lead of monthlyLeads) {
      const d = lead.createdAt;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (key in monthlyMap) monthlyMap[key]++;
    }
    const monthly: ChartPoint[] = Object.entries(monthlyMap).map(([label, count]) => ({ label, count }));

    // ── 7. Chart: quarterly (last 3 months from monthly) ─────────────────────
    const quarterly = monthly.slice(-3);

    // ── 8. Recent leads ───────────────────────────────────────────────────────
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
