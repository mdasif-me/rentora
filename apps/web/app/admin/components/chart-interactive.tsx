"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/motion/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartPoint } from "@rentora/types";

const CHART_CONFIG = {
  count: { label: "Leads", color: "#f97316" },
};

type RangeKey = "hourly" | "daily" | "monthly" | "quarterly";

interface ChartData {
  hourly: ChartPoint[];
  daily: ChartPoint[];
  monthly: ChartPoint[];
  quarterly: ChartPoint[];
}

interface LeadsChartProps {
  data: ChartData | null;
  loading?: boolean;
}

function formatLabel(label: string, range: RangeKey): string {
  if (range === "hourly") {
    const [datePart, hourPart] = label.split("T");
    if (!datePart || !hourPart) return label;
    const d = new Date(`${datePart}T${hourPart}:00:00Z`);
    return isNaN(d.getTime())
      ? label
      : d.toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: true,
          timeZone: "UTC",
        });
  }
  if (range === "daily") {
    const d = new Date(`${label}T00:00:00Z`);
    return isNaN(d.getTime())
      ? label
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        });
  }
  if (range === "monthly" || range === "quarterly") {
    const [y, m] = label.split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    return isNaN(d.getTime())
      ? label
      : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  return label;
}

const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "hourly", label: "Last 24 hours" },
  { value: "daily", label: "Last 30 days" },
  { value: "monthly", label: "Last 12 months" },
  { value: "quarterly", label: "Last 3 months" },
];

const RANGE_DESCRIPTIONS: Record<RangeKey, string> = {
  hourly: "Hourly lead count — last 24 hours",
  daily: "Daily lead count — last 30 days",
  monthly: "Monthly lead count — last 12 months",
  quarterly: "Monthly lead count — last 3 months",
};

export function LeadsChart({ data, loading = false }: LeadsChartProps) {
  const [range, setRange] = React.useState<RangeKey>("hourly");

  const rawPoints = data?.[range] ?? [];

  const chartPoints = rawPoints.map((p) => ({
    ...p,
    displayLabel: formatLabel(p.label, range),
  }));

  const totalInRange = rawPoints.reduce((s, p) => s + p.count, 0);

  return (
    <Card className="shadow-sm border-zinc-200">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border/40 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
            Lead Requests
            {!loading && (
              <span className="text-sm font-semibold text-orange-500">
                ({totalInRange} total)
              </span>
            )}
          </CardTitle>
          <CardDescription>{RANGE_DESCRIPTIONS[range]}</CardDescription>
        </div>
        <div className="w-44 sm:ml-auto">
          <Select value={range} onValueChange={(v) => setRange(v as RangeKey)}>
            <SelectTrigger aria-label="Select time range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RANGE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="h-[260px] w-full animate-pulse rounded-xl bg-zinc-100" />
        ) : (
          <ChartContainer
            config={CHART_CONFIG}
            className="aspect-auto h-[260px] w-full"
          >
            <AreaChart
              data={chartPoints}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="fillLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.75} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f4f4f5" />
              <XAxis
                dataKey="displayLabel"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={
                  range === "hourly" ? 40 : range === "daily" ? 28 : 12
                }
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#a1a1aa" }}
                allowDecimals={false}
                width={28}
              />
              <ChartTooltip
                cursor={{
                  stroke: "#f97316",
                  strokeWidth: 1,
                  strokeDasharray: "4 2",
                }}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="count"
                name="Leads"
                type="monotone"
                fill="url(#fillLeads)"
                stroke="#f97316"
                strokeWidth={2}
                dot={
                  chartPoints.length <= 12
                    ? { r: 3, fill: "#f97316", strokeWidth: 0 }
                    : false
                }
                activeDot={{ r: 5, fill: "#f97316", strokeWidth: 0 }}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
