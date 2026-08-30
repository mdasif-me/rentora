export const dynamic = "force-dynamic";
import type { Vehicle } from "@rentora/types";
import VehiclesClientPage from "./client-page";

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/vehicles`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : json;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-zinc-500">No vehicles found.</p>
      </div>
    );
  }
  return <VehiclesClientPage initialData={vehicles} />;
}
