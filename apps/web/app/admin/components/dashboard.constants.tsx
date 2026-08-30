import type { TableColumn } from "@/components/motion/table";
import type { ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type {
  BestSeller,
  ChartDataPoint,
  RecentTransaction,
} from "./dashboard.types";

export const BEST_SELLERS_DATA: BestSeller[] = [
  {
    id: "1",
    name: "Range Rover Velar",
    price: "$260/day",
    sales: 6547,
    revenue: "$1.7M",
  },
  {
    id: "2",
    name: "Tesla Model S",
    price: "$180/day",
    sales: 5200,
    revenue: "$936K",
  },
  {
    id: "3",
    name: "Porsche 911",
    price: "$350/day",
    sales: 4100,
    revenue: "$1.4M",
  },
  {
    id: "4",
    name: "Mercedes G-Wagon",
    price: "$400/day",
    sales: 3800,
    revenue: "$1.5M",
  },
  {
    id: "5",
    name: "Audi RS e-tron GT",
    price: "$220/day",
    sales: 3100,
    revenue: "$682K",
  },
  { id: "6", name: "BMW X5", price: "$250/day", sales: 2900, revenue: "$725K" },
  {
    id: "7",
    name: "Lamborghini Huracan",
    price: "$500/day",
    sales: 2700,
    revenue: "$1.35M",
  },
  {
    id: "8",
    name: "Ferrari F8 Tributo",
    price: "$550/day",
    sales: 2500,
    revenue: "$1.375M",
  },
  {
    id: "9",
    name: "Maserati Levante",
    price: "$300/day",
    sales: 2300,
    revenue: "$690K",
  },
  {
    id: "10",
    name: "Jaguar F-Type",
    price: "$280/day",
    sales: 2100,
    revenue: "$588K",
  },
  {
    id: "11",
    name: "Chevrolet Corvette",
    price: "$320/day",
    sales: 1900,
    revenue: "$608K",
  },
  {
    id: "12",
    name: "Nissan GT-R",
    price: "$350/day",
    sales: 1700,
    revenue: "$595K",
  },
  {
    id: "13",
    name: "Aston Martin Vantage",
    price: "$400/day",
    sales: 1500,
    revenue: "$600K",
  },
  {
    id: "14",
    name: "McLaren 720S",
    price: "$600/day",
    sales: 1300,
    revenue: "$780K",
  },
  {
    id: "15",
    name: "Bentley Continental GT",
    price: "$450/day",
    sales: 1100,
    revenue: "$495K",
  },
];

export const BEST_SELLERS_COLUMNS: TableColumn<BestSeller>[] = [
  { key: "name", header: "Vehicle", align: "left", width: "40%" },
  { key: "sales", header: "Sales", align: "center", width: "25%" },
  { key: "price", header: "Price", align: "center", width: "15%" },
  { key: "revenue", header: "Revenue", align: "right", width: "20%" },
];

export const RECENT_TX_DATA: RecentTransaction[] = [
  {
    id: "tx1",
    car: "Range Rover",
    time: "2 hours ago",
    method: "Mastercard",
    tx: "TX-4899",
    status: "Completed",
    amount: "$520",
  },
  {
    id: "tx2",
    car: "Tesla Model S",
    time: "4 hours ago",
    method: "Visa",
    tx: "TX-4900",
    status: "Pending",
    amount: "$180",
  },
  {
    id: "tx3",
    car: "Porsche 911",
    time: "5 hours ago",
    method: "Paypal",
    tx: "TX-4901",
    status: "Completed",
    amount: "$700",
  },
  {
    id: "tx4",
    car: "Audi RS",
    time: "1 day ago",
    method: "Mastercard",
    tx: "TX-4902",
    status: "Failed",
    amount: "$220",
  },
  {
    id: "tx5",
    car: "BMW X5",
    time: "1 day ago",
    method: "Visa",
    tx: "TX-4903",
    status: "Completed",
    amount: "$250",
  },
  {
    id: "tx6",
    car: "Mercedes G-Wagon",
    time: "2 days ago",
    method: "Paypal",
    tx: "TX-4904",
    status: "Pending",
    amount: "$400",
  },
  {
    id: "tx7",
    car: "Lamborghini Huracan",
    time: "2 days ago",
    method: "Mastercard",
    tx: "TX-4905",
    status: "Completed",
    amount: "$500",
  },
  {
    id: "tx8",
    car: "Ferrari F8 Tributo",
    time: "3 days ago",
    method: "Visa",
    tx: "TX-4906",
    status: "Failed",
    amount: "$550",
  },
  {
    id: "tx9",
    car: "Maserati Levante",
    time: "3 days ago",
    method: "Paypal",
    tx: "TX-4907",
    status: "Completed",
    amount: "$300",
  },
  {
    id: "tx10",
    car: "Jaguar F-Type",
    time: "4 days ago",
    method: "Mastercard",
    tx: "TX-4908",
    status: "Pending",
    amount: "$280",
  },
];

export const RECENT_TX_COLUMNS: TableColumn<RecentTransaction>[] = [
  {
    key: "car",
    header: "Vehicle",
    align: "left",
    cell: (row: RecentTransaction) => (
      <div className="flex flex-col py-1">
        <span className="font-semibold text-zinc-900">{row.car}</span>
        <span className="text-xs text-zinc-500">{row.time}</span>
      </div>
    ),
  },
  {
    key: "method",
    header: "Payment",
    align: "left",
    cell: (row: RecentTransaction) => (
      <div className="flex flex-col py-1">
        <span className="font-semibold text-zinc-900">{row.method}</span>
        <span className="text-[10px] text-blue-600 font-semibold">
          {row.tx}
        </span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    cell: (row: RecentTransaction) => (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          row.status === "Completed"
            ? "bg-emerald-100 text-emerald-700"
            : row.status === "Pending"
              ? "bg-amber-100 text-amber-700"
              : "bg-rose-100 text-rose-700",
        )}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    cell: (row: RecentTransaction) => (
      <span className="font-bold text-zinc-900">{row.amount}</span>
    ),
  },
];

export const CHART_DATA: ChartDataPoint[] = [
  { date: "2024-04-01", sales: 372 },
  { date: "2024-04-02", sales: 277 },
  { date: "2024-04-03", sales: 287 },
  { date: "2024-04-04", sales: 502 },
  { date: "2024-04-05", sales: 663 },
  { date: "2024-04-06", sales: 641 },
  { date: "2024-04-07", sales: 425 },
  { date: "2024-04-08", sales: 729 },
  { date: "2024-04-09", sales: 169 },
  { date: "2024-04-10", sales: 451 },
  { date: "2024-04-11", sales: 677 },
  { date: "2024-04-12", sales: 502 },
  { date: "2024-04-13", sales: 722 },
  { date: "2024-04-14", sales: 357 },
  { date: "2024-04-15", sales: 290 },
  { date: "2024-04-16", sales: 328 },
  { date: "2024-04-17", sales: 806 },
  { date: "2024-04-18", sales: 774 },
  { date: "2024-04-19", sales: 423 },
  { date: "2024-04-20", sales: 239 },
  { date: "2024-04-21", sales: 337 },
  { date: "2024-04-22", sales: 394 },
  { date: "2024-04-23", sales: 368 },
  { date: "2024-04-24", sales: 677 },
  { date: "2024-04-25", sales: 465 },
  { date: "2024-04-26", sales: 205 },
  { date: "2024-04-27", sales: 803 },
  { date: "2024-04-28", sales: 302 },
  { date: "2024-04-29", sales: 555 },
  { date: "2024-04-30", sales: 834 },
  { date: "2024-05-01", sales: 385 },
  { date: "2024-05-02", sales: 603 },
  { date: "2024-05-03", sales: 437 },
  { date: "2024-05-04", sales: 805 },
  { date: "2024-05-05", sales: 871 },
  { date: "2024-05-06", sales: 1018 },
  { date: "2024-05-07", sales: 688 },
  { date: "2024-05-08", sales: 359 },
  { date: "2024-05-09", sales: 407 },
  { date: "2024-05-10", sales: 623 },
  { date: "2024-05-11", sales: 605 },
  { date: "2024-05-12", sales: 437 },
  { date: "2024-05-13", sales: 357 },
  { date: "2024-05-14", sales: 938 },
  { date: "2024-05-15", sales: 853 },
  { date: "2024-05-16", sales: 738 },
  { date: "2024-05-17", sales: 919 },
  { date: "2024-05-18", sales: 665 },
  { date: "2024-05-19", sales: 415 },
  { date: "2024-05-20", sales: 407 },
  { date: "2024-05-21", sales: 222 },
  { date: "2024-05-22", sales: 201 },
  { date: "2024-05-23", sales: 542 },
  { date: "2024-05-24", sales: 514 },
  { date: "2024-05-25", sales: 451 },
  { date: "2024-05-26", sales: 383 },
  { date: "2024-05-27", sales: 880 },
  { date: "2024-05-28", sales: 423 },
  { date: "2024-05-29", sales: 208 },
  { date: "2024-05-30", sales: 620 },
  { date: "2024-05-31", sales: 408 },
  { date: "2024-06-01", sales: 378 },
  { date: "2024-06-02", sales: 880 },
  { date: "2024-06-03", sales: 263 },
  { date: "2024-06-04", sales: 819 },
  { date: "2024-06-05", sales: 228 },
  { date: "2024-06-06", sales: 544 },
  { date: "2024-06-07", sales: 693 },
  { date: "2024-06-08", sales: 705 },
  { date: "2024-06-09", sales: 918 },
  { date: "2024-06-10", sales: 355 },
  { date: "2024-06-11", sales: 242 },
  { date: "2024-06-12", sales: 912 },
  { date: "2024-06-13", sales: 211 },
  { date: "2024-06-14", sales: 806 },
  { date: "2024-06-15", sales: 657 },
  { date: "2024-06-16", sales: 681 },
  { date: "2024-06-17", sales: 995 },
  { date: "2024-06-18", sales: 277 },
  { date: "2024-06-19", sales: 631 },
  { date: "2024-06-20", sales: 858 },
  { date: "2024-06-21", sales: 379 },
  { date: "2024-06-22", sales: 587 },
  { date: "2024-06-23", sales: 1010 },
  { date: "2024-06-24", sales: 312 },
  { date: "2024-06-25", sales: 331 },
  { date: "2024-06-26", sales: 814 },
  { date: "2024-06-27", sales: 938 },
  { date: "2024-06-28", sales: 349 },
  { date: "2024-06-29", sales: 263 },
  { date: "2024-06-30", sales: 846 },
];

export const CHART_CONFIG = {
  visitors: {
    label: "Visitors",
  },
  sales: { label: "Sales", color: "#f97316" },
} satisfies ChartConfig;
