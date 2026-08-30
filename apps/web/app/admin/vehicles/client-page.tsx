"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Table, type TableColumn } from "@/components/motion/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RiAddLine, RiCarLine } from "@remixicon/react";
import type { Vehicle } from "@rentora/types";

const vehicleColumns: TableColumn<Vehicle>[] = [
  {
    key: "name",
    header: "Vehicle",
    align: "left",
    cell: (row) => (
      <div className="flex items-center gap-3 py-2">
        {row.image ? (
          <div className="h-10 w-16 relative rounded-md overflow-hidden bg-zinc-100 shrink-0">
            <Image src={row.image} alt={row.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-10 w-16 rounded-md bg-zinc-100 flex items-center justify-center shrink-0">
            <RiCarLine className="h-5 w-5 text-zinc-400" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900">{row.name}</span>
          <span className="text-xs text-zinc-500">{row.category?.name || "Uncategorized"}</span>
        </div>
      </div>
    ),
  },
  { key: "type", header: "Type", align: "center", width: "15%" },
  { 
    key: "pricePerDay", 
    header: "Price/Day", 
    align: "center", 
    width: "15%",
    cell: (row) => <span className="font-semibold text-zinc-900">${row.pricePerDay}</span>
  },
  { key: "transmission", header: "Transmission", align: "center", width: "15%" },
  { key: "fuel", header: "Fuel", align: "center", width: "15%" },
];

export default function VehiclesClientPage({ initialData }: { initialData: Vehicle[] }) {
  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Vehicles</h1>
          <p className="text-sm text-zinc-500 font-medium mt-1">
            Manage your fleet of vehicles.
          </p>
        </div>
        <Link href="/admin/vehicles/create">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
            <RiAddLine className="h-4 w-4" />
            Add Vehicle
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm border-zinc-200 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40 shrink-0">
          <CardTitle className="text-base font-bold text-zinc-900">All Vehicles</CardTitle>
        </CardHeader>
        <div className="p-0 overflow-hidden rounded-b-xl border-t-0 flex-1 min-h-[500px]">
          <Table
            data={initialData}
            columns={vehicleColumns}
            rowHeight={64}
            className="border-none rounded-none h-full"
            emptyState="No vehicles found."
          />
        </div>
      </Card>
    </div>
  );
}
