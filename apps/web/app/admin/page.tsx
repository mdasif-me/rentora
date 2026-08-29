"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  RiArrowDownSLine,
  RiArrowUpLine,
  RiArrowUpSLine,
  RiCalendarEventLine,
  RiRefreshLine,
  RiShoppingBag3Fill,
  RiStackFill,
} from "@remixicon/react";
import Image from "next/image";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      {/* Top Greeting & Date Range Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-zinc-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="Waving hand">
            👋
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Hi Mike Witzel,
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
              here&apos;s what&apos;s happening with your store today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-bold text-zinc-700">
            <RiCalendarEventLine className="h-4 w-4 text-zinc-400 shrink-0" />
            <span>01 Jan 2024 - 07 Jan 2024</span>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Refresh data"
          >
            <RiRefreshLine className="h-4 w-4 shrink-0" />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle header"
          >
            <RiArrowUpSLine className="h-4 w-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Row 1: 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Weekly Earning Card */}
        <div className="md:col-span-6 rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Weekly Earning
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              $95000.45
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <RiArrowUpLine className="h-3.5 w-3.5 shrink-0" />
              <span>48%</span>
              <span className="font-normal text-zinc-500">
                increase compare to last week
              </span>
            </div>
          </div>

          <div className="relative h-24 w-24 shrink-0 flex items-center justify-center rounded-2xl bg-amber-50">
            <RiStackFill className="h-12 w-12 text-amber-500 shrink-0" />
          </div>
        </div>

        {/* Total Sales Card */}
        <div className="md:col-span-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white shadow-xs flex flex-col justify-between relative overflow-hidden">
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Refresh total sales"
          >
            <RiRefreshLine className="h-4 w-4 shrink-0" />
          </button>

          <RiShoppingBag3Fill className="h-8 w-8 text-white/90 mb-6 shrink-0" />

          <div>
            <div className="text-3xl font-extrabold tracking-tight">
              10,000+
            </div>
            <div className="text-xs font-medium text-white/90 mt-1">
              No of Total Sales
            </div>
          </div>
        </div>

        {/* Purchased Goods Card */}
        <div className="md:col-span-3 rounded-2xl bg-slate-900 p-6 text-white shadow-xs flex flex-col justify-between relative overflow-hidden">
          <button
            type="button"
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Refresh purchased goods"
          >
            <RiRefreshLine className="h-4 w-4 shrink-0" />
          </button>

          <RiShoppingBag3Fill className="h-8 w-8 text-amber-400 mb-6 shrink-0" />

          <div>
            <div className="text-3xl font-extrabold tracking-tight">800+</div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              No of Purchased Goods
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Best Seller & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Best Seller List */}
        <div className="lg:col-span-4 rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-zinc-900">Best Seller</h3>
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold h-8 border-zinc-200 text-zinc-600"
            >
              View All
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            {[
              {
                name: "Range Rover",
                price: "$260",
                sales: "6547",
                img: "https://placehold.co/120x80/94a3b8/ffffff.png?text=Range",
              },
              {
                name: "Audi S3",
                price: "$1474",
                sales: "3474",
                img: "https://placehold.co/120x80/94a3b8/ffffff.png?text=Audi",
              },
              {
                name: "Blue Nissan",
                price: "$8784",
                sales: "1478",
                img: "https://placehold.co/120x80/94a3b8/ffffff.png?text=Nissan",
              },
              {
                name: "Toyota Corolla",
                price: "$3240",
                sales: "987",
                img: "https://placehold.co/120x80/94a3b8/ffffff.png?text=Corolla",
              },
              {
                name: "Compact car",
                price: "$597",
                sales: "784",
                img: "https://placehold.co/120x80/94a3b8/ffffff.png?text=Compact",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-14 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200/60">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-semibold text-zinc-400">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[11px] font-medium text-zinc-400 uppercase">
                    Sales
                  </span>
                  <span className="block text-xs font-extrabold text-zinc-900">
                    {item.sales}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="lg:col-span-8 rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-zinc-900">
              Recent Transactions
            </h3>
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold h-8 border-zinc-200 text-zinc-600"
            >
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  <th className="pb-3 pr-2">#</th>
                  <th className="pb-3 px-3">Order Details</th>
                  <th className="pb-3 px-3">Payment</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 pl-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-xs">
                {[
                  {
                    id: 1,
                    car: "Range Rover",
                    time: "15 Mins",
                    method: "Paypal",
                    txn: "#416645453773",
                    status: "Success",
                    badgeColor: "bg-emerald-500 text-white",
                    amount: "$1099.00",
                    img: "https://placehold.co/100x70/94a3b8/ffffff.png?text=Rover",
                  },
                  {
                    id: 2,
                    car: "Red Toyota",
                    time: "15 Mins",
                    method: "Apple Pay",
                    txn: "#147784454554",
                    status: "Cancelled",
                    badgeColor: "bg-red-600 text-white",
                    amount: "$600.55",
                    img: "https://placehold.co/100x70/94a3b8/ffffff.png?text=Toyota",
                  },
                  {
                    id: 3,
                    car: "blue Nissan",
                    time: "15 Mins",
                    method: "Stripe",
                    txn: "#147784454554",
                    status: "Pending",
                    badgeColor: "bg-sky-500 text-white",
                    amount: "$200.10",
                    img: "https://placehold.co/100x70/94a3b8/ffffff.png?text=Nissan",
                  },
                  {
                    id: 4,
                    car: "Toyota Corolla",
                    time: "15 Mins",
                    method: "PayU",
                    txn: "#147784454554",
                    status: "Success",
                    badgeColor: "bg-emerald-500 text-white",
                    amount: "$1569.00",
                    img: "https://placehold.co/100x70/94a3b8/ffffff.png?text=Corolla",
                  },
                  {
                    id: 5,
                    car: "Range Rover",
                    time: "15 Mins",
                    method: "Paytm",
                    txn: "#147784454554",
                    status: "Success",
                    badgeColor: "bg-emerald-500 text-white",
                    amount: "$1478.00",
                    img: "https://placehold.co/100x70/94a3b8/ffffff.png?text=Rover",
                  },
                ].map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-zinc-50/80 transition-colors"
                  >
                    <td className="py-3.5 pr-2 font-bold text-zinc-400">
                      {row.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-12 rounded-lg bg-zinc-100 overflow-hidden shrink-0 border border-zinc-200/60">
                          <Image
                            src={row.img}
                            alt={row.car}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900">
                            {row.car}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            ⏱ {row.time}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-700">
                          {row.method}
                        </span>
                        <span className="text-[10px] text-blue-600 font-semibold">
                          {row.txn}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold",
                          row.badgeColor,
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 text-right font-extrabold text-zinc-900">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 3: Sales Analytics Chart & Sales by Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Analytics Chart */}
        <div className="lg:col-span-8 rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-zinc-900">
              Sales Analytics
            </h3>
            <div className="flex items-center gap-1.5 h-8 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-bold text-zinc-700">
              <RiCalendarEventLine className="h-3.5 w-3.5 text-zinc-400" />
              <span>2023</span>
            </div>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="w-full h-64 relative flex items-end pt-4 pb-6 px-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 700 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1="0"
                y1="0"
                x2="700"
                y2="0"
                stroke="#f4f4f5"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="40"
                x2="700"
                y2="40"
                stroke="#f4f4f5"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="80"
                x2="700"
                y2="80"
                stroke="#f4f4f5"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="120"
                x2="700"
                y2="120"
                stroke="#f4f4f5"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="160"
                x2="700"
                y2="160"
                stroke="#f4f4f5"
                strokeWidth="1"
              />

              {/* Area Fill */}
              <path
                d="M 0 140 Q 90 60 175 140 T 350 140 T 525 80 T 700 150 L 700 200 L 0 200 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Line */}
              <path
                d="M 0 140 Q 90 60 175 140 T 350 140 T 525 80 T 700 150"
                fill="none"
                stroke="#f97316"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Data Dots */}
              <circle
                cx="87"
                cy="100"
                r="5"
                fill="#f97316"
                className="ring-4 ring-white"
              />
              <circle
                cx="262"
                cy="140"
                r="5"
                fill="#f97316"
                className="ring-4 ring-white"
              />
              <circle
                cx="437"
                cy="110"
                r="5"
                fill="#f97316"
                className="ring-4 ring-white"
              />
              <circle
                cx="525"
                cy="80"
                r="6"
                fill="#f97316"
                className="ring-4 ring-white"
              />
              <circle
                cx="612"
                cy="140"
                r="5"
                fill="#f97316"
                className="ring-4 ring-white"
              />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 pt-2 border-t border-zinc-100">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>July</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>

        {/* Sales by Countries */}
        <div className="lg:col-span-4 rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-zinc-900">
              Sales by Countries
            </h3>
            <div className="flex items-center gap-1.5 h-8 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 text-xs font-semibold text-zinc-700">
              <span>This Week</span>
              <RiArrowDownSLine className="h-3.5 w-3.5 text-zinc-400" />
            </div>
          </div>

          <div className="relative w-full h-56 my-auto flex flex-col items-center justify-center rounded-xl bg-slate-900/5 p-4">
            {/* World Map Illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="bg-orange-500 text-white rounded-xl shadow-md p-3 text-center z-10 animate-bounce">
                <div className="text-xs font-bold">Africa</div>
                <div className="text-sm font-extrabold text-zinc-900 bg-white rounded-lg px-3 py-1 mt-1">
                  3455 Sales
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-bold text-emerald-600">
            <RiArrowUpLine className="h-4 w-4 shrink-0" />
            <span>48%</span>
            <span className="font-normal text-zinc-500">
              increase compare to last week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
