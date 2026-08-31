export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  isActive: boolean;
  order: number;
}

export interface Vehicle {
  id: string;
  name: string;
  categoryId: string;
  category?: Category;
  type: string;
  pricePerDay: number;
  transmission: "Auto" | "Manual";
  fuel: string;
  location: string;
  available: boolean;
  image?: string;
  isFavorite?: boolean;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleId: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  dropOffDate: string;
  createdAt: Date;
  status?: string;
  vehicle?: Vehicle;
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

export interface ChartPoint {
  label: string;
  count: number;
}

export interface DashboardStats {
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
