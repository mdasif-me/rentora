"use client";

import type { TableColumn } from "@/components/motion/table";
import { Table } from "@/components/motion/table";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  RiArrowRightLine,
  RiCarLine,
  RiFileListLine,
  RiLoader4Line,
  RiMoneyDollarCircleLine,
} from "@remixicon/react";
import type { DashboardStats, RecentLeadItem } from "@rentora/types";
import { useEffect, useState } from "react";
import { LeadsChart } from "./chart-interactive";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const s = status.toUpperCase();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        s === "APPROVED"
          ? "bg-emerald-100 text-emerald-700"
          : s === "REJECTED"
            ? "bg-rose-100 text-rose-700"
            : "bg-amber-100 text-amber-700",
      )}
    >
      {s === "APPROVED"
        ? "Approved"
        : s === "REJECTED"
          ? "Rejected"
          : "Pending"}
    </span>
  );
}

// ─── Table columns ────────────────────────────────────────────────────────────

const LEADS_COLUMNS: TableColumn<RecentLeadItem>[] = [
  {
    key: "name",
    header: "Customer",
    align: "left",
    width: "18%",
    cell: (row) => (
      <div className="flex flex-col py-1">
        <span className="font-semibold text-zinc-900 truncate">{row.name}</span>
        <span className="text-[11px] text-zinc-500 truncate">{row.email}</span>
      </div>
    ),
  },
  {
    key: "vehicleName",
    header: "Vehicle",
    align: "left",
    width: "16%",
    cell: (row) => (
      <div className="flex flex-col py-1">
        <span className="font-semibold text-zinc-900 truncate">
          {row.vehicleName}
        </span>
        <span className="text-[11px] text-zinc-500">
          ${row.vehiclePrice}/day
        </span>
      </div>
    ),
  },
  {
    key: "pickUpLocation",
    header: "Pick-up",
    align: "left",
    width: "14%",
    cell: (row) => (
      <span className="text-sm text-zinc-700 truncate">
        {row.pickUpLocation}
      </span>
    ),
  },
  {
    key: "dropOffLocation",
    header: "Drop-off",
    align: "left",
    width: "14%",
    cell: (row) => (
      <span className="text-sm text-zinc-700 truncate">
        {row.dropOffLocation}
      </span>
    ),
  },
  {
    key: "pickUpDate",
    header: "Rental Dates",
    align: "left",
    width: "20%",
    cell: (row) => {
      const fmt = (iso: string) =>
        new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      return (
        <div className="flex flex-col py-1 gap-0.5">
          <span className="text-[11px] text-zinc-500">
            <span className="font-semibold text-zinc-700">↑</span>{" "}
            {fmt(row.pickUpDate)}
          </span>
          <span className="text-[11px] text-zinc-500">
            <span className="font-semibold text-zinc-700">↓</span>{" "}
            {fmt(row.dropOffDate)}
          </span>
        </div>
      );
    },
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    width: "10%",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "createdAt",
    header: "Submitted",
    align: "right",
    width: "8%",
    cell: (row) => (
      <span className="text-[11px] text-zinc-500">
        {new Date(row.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
  },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CardSkeleton({
  dark = false,
  accent = false,
}: {
  dark?: boolean;
  accent?: boolean;
}) {
  const bg = dark
    ? "bg-gradient-to-br from-zinc-900 to-zinc-800"
    : accent
      ? "bg-gradient-to-br from-amber-400 to-orange-500"
      : "bg-white border border-zinc-100";
  const line = dark || accent ? "bg-white/20" : "bg-zinc-200";
  return (
    <div className={cn("rounded-2xl shadow-sm p-6 animate-pulse", bg)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl", line)} />
        <div className={cn("h-3 w-12 rounded", line)} />
      </div>
      <div className={cn("h-9 w-24 rounded mb-2", line)} />
      <div className={cn("h-3 w-32 rounded", line)} />
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className={cn("h-2 w-full rounded-full", line)} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/dashboard`, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // NestJS global interceptor wraps response in { success, data, timestamp }
        const data: DashboardStats = json?.data ?? json;
        setStats(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col space-y-10 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-zinc-500 font-medium">
          Welcome back, Admin. Here&apos;s your rental business at a glance.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-medium">
          {error}
        </div>
      )}

      {/* ── Row 1: 3 Metric Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton dark />
            <CardSkeleton accent />
          </>
        ) : (
          <>
            {/* Card 1 — Weekly Earnings */}
            <div className="relative rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-2xl" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                      Weekly Earnings
                    </p>
                    <p className="text-4xl font-black text-zinc-900 tracking-tight leading-none">
                      ${(stats?.weeklyEarnings ?? 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">
                      From{" "}
                      <span className="font-semibold text-emerald-600">
                        {stats?.approvedLeads ?? 0} approved
                      </span>{" "}
                      leads this week
                    </p>
                  </div>
                  <div className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-orange-200">
                    <RiMoneyDollarCircleLine className="h-5 w-5 text-white" />
                  </div>
                </div>
                {/* divider */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600">
                    <RiMoneyDollarCircleLine className="h-3 w-3" />$
                    {stats?.minPrice ?? 0}–${stats?.maxPrice ?? 0}/day fleet
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 — Total Leads */}
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-sm overflow-hidden">
              {/* decorative ring */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/5" />
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-white/5" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/10 border border-white/10">
                    <RiFileListLine className="h-5 w-5 text-white/80" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    All Time
                  </span>
                </div>
                <p className="text-4xl font-black text-white tracking-tight leading-none">
                  {(stats?.totalLeads ?? 0).toLocaleString()}
                </p>
                <p className="text-xs font-medium text-white/50 mt-1.5">
                  Total Rental Requests
                </p>

                {/* Visual breakdown bar */}
                {(stats?.totalLeads ?? 0) > 0 && (
                  <div className="mt-4">
                    <div className="flex rounded-full overflow-hidden h-1.5 bg-white/10 gap-px">
                      {(stats?.approvedLeads ?? 0) > 0 && (
                        <div
                          className="bg-emerald-400 rounded-full"
                          style={{
                            width: `${((stats?.approvedLeads ?? 0) / (stats?.totalLeads ?? 1)) * 100}%`,
                          }}
                        />
                      )}
                      {(stats?.rejectedLeads ?? 0) > 0 && (
                        <div
                          className="bg-rose-400 rounded-full"
                          style={{
                            width: `${((stats?.rejectedLeads ?? 0) / (stats?.totalLeads ?? 1)) * 100}%`,
                          }}
                        />
                      )}
                      {(stats?.pendingLeads ?? 0) > 0 && (
                        <div
                          className="bg-amber-400 rounded-full"
                          style={{
                            width: `${((stats?.pendingLeads ?? 0) / (stats?.totalLeads ?? 1)) * 100}%`,
                          }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {stats?.approvedLeads ?? 0} Approved
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-rose-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        {stats?.rejectedLeads ?? 0} Rejected
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                        {stats?.pendingLeads ?? 0} Pending
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card 3 — Fleet Vehicles */}
            <div className="relative rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-sm overflow-hidden">
              <div className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-white/10" />
              <div className="absolute -left-2 -bottom-2 h-16 w-16 rounded-full bg-white/10" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white/20 border border-white/20">
                    <RiCarLine className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Fleet
                  </span>
                </div>
                <p className="text-4xl font-black text-white tracking-tight leading-none">
                  {stats?.totalVehicles ?? 0}
                </p>
                <p className="text-xs font-medium text-white/75 mt-1.5">
                  Vehicles in Fleet
                </p>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-[11px] text-white/60 font-medium mb-1">
                    Price range
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      ${stats?.minPrice ?? 0}
                    </span>
                    <span className="flex-1 h-px bg-white/30 relative">
                      <span className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                        <RiArrowRightLine className="h-3 w-3 text-white/50" />
                      </span>
                    </span>
                    <span className="text-sm font-bold text-white">
                      ${stats?.maxPrice ?? 0}
                    </span>
                    <span className="text-xs text-white/60 font-medium">
                      /day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Row 2: Leads Chart ── */}
      <div>
        <LeadsChart data={stats?.chart ?? null} loading={loading} />
      </div>

      {/* ── Row 3: Recent Leads Table ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-semibold text-xl text-zinc-900">Recent Leads</h3>
          {loading ? (
            <RiLoader4Line className="h-4 w-4 animate-spin text-zinc-400" />
          ) : (
            <span className="text-sm font-medium text-zinc-500">
              Showing latest {(stats?.recentLeads ?? []).length} of{" "}
              {stats?.totalLeads ?? 0} requests
            </span>
          )}
        </div>

        {!loading && (stats?.recentLeads ?? []).length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <RiFileListLine className="h-10 w-10 text-zinc-300" />
              <p className="text-sm font-medium text-zinc-500">
                No leads submitted yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Table
            data={stats?.recentLeads ?? []}
            columns={LEADS_COLUMNS}
            resizable
            reorderable
            defaultSort={{ key: "createdAt", direction: "desc" }}
            height={480}
            rowHeight={56}
            className="rounded-2xl"
            loading={loading}
            skeletonRows={5}
          />
        )}
      </div>
    </div>
  );
}
