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
}

export interface Transaction {
  id: string;
  carName: string;
  image?: string;
  type: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
}

export interface BestSeller {
  id: string;
  name: string;
  category: string;
  image?: string;
  rentCount: number;
  price: number;
}

export interface DashboardStats {
  weeklyEarnings: { value: number; change: number };
  totalSales: { value: number; change: number };
  purchasedGoods: { value: number; change: number };
  bestSellers: BestSeller[];
  recentTransactions: Transaction[];
  salesChartData: { month: string; sales: number }[];
  salesByCountry: { country: string; value: number }[];
}
