"use client";

import { Table } from "@/components/motion/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  RiArrowUpLine,
  RiShoppingBag3Fill,
  RiStackFill,
} from "@remixicon/react";

import { ChartAreaInteractive } from "./components/chart-interactive";
import {
  BEST_SELLERS_COLUMNS,
  BEST_SELLERS_DATA,
  RECENT_TX_COLUMNS,
  RECENT_TX_DATA,
} from "./components/dashboard.constants";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col space-y-10 max-w-[1600px] mx-auto pb-12">
      {/* Top Greeting */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Welcome back, Admin. Here&apos;s your store&apos;s performance today.
        </p>
      </div>

      {/* Row 1: 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weekly Earning Card */}
        <Card className="shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Weekly Earning
              </span>
              <div className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                $95,000
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1">
                <RiArrowUpLine className="h-3.5 w-3.5 shrink-0" />
                <span>+48%</span>
                <span className="text-zinc-400 font-medium">vs last week</span>
              </div>
            </div>
            <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-amber-50">
              <RiStackFill className="h-6 w-6 text-amber-500 shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Total Sales Card */}
        <Card className="shadow-sm bg-gradient-to-br from-zinc-900 to-zinc-800 text-white border-0">
          <CardContent className="p-5 flex flex-col justify-between h-full relative">
            <RiShoppingBag3Fill className="h-6 w-6 text-white/50 mb-4 shrink-0" />
            <div>
              <div className="text-2xl font-extrabold tracking-tight">
                10,000+
              </div>
              <div className="text-xs font-medium text-white/70 mt-1">
                Total Sales
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchased Goods Card */}
        <Card className="shadow-sm bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0">
          <CardContent className="p-5 flex flex-col justify-between h-full relative">
            <RiShoppingBag3Fill className="h-6 w-6 text-white/50 mb-4 shrink-0" />
            <div>
              <div className="text-2xl font-extrabold tracking-tight">800+</div>
              <div className="text-xs font-medium text-white/80 mt-1">
                Purchased Goods
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Interactive Sales Analytics Chart (Full Width) */}
      <div className="grid grid-cols-1">
        <ChartAreaInteractive />
      </div>

      {/* Row 3: Best Seller & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Seller List */}
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between px-1 text-muted-foreground text-xs">
              <h3 className="font-semibold text-xl text-foreground">
                Best Sellers
              </h3>
              <span className="font-medium text-muted-foreground">
                Showing last {BEST_SELLERS_DATA.length} transactions
              </span>
            </div>
            <Table
              data={BEST_SELLERS_DATA}
              columns={BEST_SELLERS_COLUMNS}
              resizable
              reorderable
              defaultSort={{ key: "mrr", direction: "desc" }}
              height={420}
              rowHeight={52}
              className="rounded-2xl"
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center justify-between px-1 text-muted-foreground text-xs">
              <h3 className="font-semibold text-xl text-foreground">
                Recent Transactions
              </h3>
              <span className="font-medium text-muted-foreground">
                Showing last 10 transactions
              </span>
            </div>
            <Table
              data={RECENT_TX_DATA}
              columns={RECENT_TX_COLUMNS}
              resizable
              reorderable
              defaultSort={{ key: "mrr", direction: "desc" }}
              height={420}
              rowHeight={52}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
