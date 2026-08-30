export interface BestSeller {
  id: string;
  name: string;
  price: string;
  sales: number;
  revenue: string;
}

export interface RecentTransaction {
  id: string;
  car: string;
  time: string;
  method: string;
  tx: string;
  status: "Completed" | "Pending" | "Failed";
  amount: string;
}

export interface ChartDataPoint {
  date: string;
  sales: number;
}
