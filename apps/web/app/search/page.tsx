export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppCard } from "@/components/container/cards";
import { RiArrowLeftLine, RiMapPinLine } from "@remixicon/react";
import type { Vehicle } from "@rentora/types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

async function getVehicles(location?: string): Promise<Vehicle[]> {
  try {
    const params = new URLSearchParams();
    if (location) params.set("location", location);

    const res = await fetch(`${API}/vehicles?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : json;
  } catch (error) {
    console.error("Failed to fetch search vehicles:", error);
    return [];
  }
}

interface SearchPageProps {
  searchParams: Promise<{
    location?: string;
    pickupDate?: string;
    pickupTime?: string;
    dropoffCity?: string;
    dropoffDate?: string;
    dropoffTime?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const location = params.location || "";

  const vehicles = await getVehicles(location);

  return (
    <main className="flex-1 py-12 bg-zinc-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back and Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-zinc-200 bg-white">
                <RiArrowLeftLine className="h-4 w-4 text-zinc-600" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Search Results</h1>
              {location ? (
                <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500 font-medium">
                  <RiMapPinLine className="h-4 w-4 text-zinc-400" />
                  <span>Vehicles available in <strong className="text-zinc-700 capitalize">{location}</strong></span>
                </div>
              ) : (
                <p className="text-sm text-zinc-500 font-medium mt-1">All available vehicles</p>
              )}
            </div>
          </div>
          <div className="text-sm text-zinc-500 font-semibold bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm self-start sm:self-auto">
            {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"} found
          </div>
        </div>

        {/* Vehicles Grid */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => {
              const cardData = {
                id: vehicle.id,
                name: vehicle.name,
                image: vehicle.image || "https://placehold.co/304x388/8d99ae/white.png",
                price: Number(vehicle.pricePerDay),
                priceUnit: "day",
                category: vehicle.category?.name || "",
              };

              return (
                <div key={vehicle.id}>
                  <AppCard vehicle={cardData} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-zinc-200 p-8 text-center max-w-xl mx-auto shadow-sm">
            <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <RiMapPinLine className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-zinc-950 mb-1">No Vehicles Available</h3>
            <p className="text-sm text-zinc-500 max-w-sm mb-6">
              We couldn't find any vehicles in <span className="font-semibold text-zinc-800 capitalize">{location || "your area"}</span> at this time. Try checking a different location.
            </p>
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6">
                Go back to home
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
