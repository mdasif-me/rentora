import type { Category, Vehicle } from "@rentora/types";
import Banner from "./components/banner";
import HowItWorks from "./components/how-work";
import PopularDeals from "./components/popular-deals";
import Search from "./components/search";
import Testimonials from "./components/testimonials";
import WhyChoose from "./components/why-choose";

export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

async function getData(): Promise<{
  categories: Category[];
  vehicles: Vehicle[];
}> {
  try {
    const [catRes, vehRes] = await Promise.all([
      fetch(`${API}/categories`, { cache: "no-store" }),
      fetch(`${API}/vehicles`, { cache: "no-store" }),
    ]);

    const catJson = catRes.ok ? await catRes.json() : [];
    const vehJson = vehRes.ok ? await vehRes.json() : [];

    return {
      categories: Array.isArray(catJson.data) ? catJson.data : catJson,
      vehicles: Array.isArray(vehJson.data) ? vehJson.data : vehJson,
    };
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    return { categories: [], vehicles: [] };
  }
}

export default async function HomePage() {
  const { categories, vehicles } = await getData();

  // Extract unique locations from vehicles array
  const rawLocations = Array.from(
    new Set(vehicles.map((v) => v.location).filter(Boolean)),
  );

  const locationsList = rawLocations.map((loc, idx) => ({
    id: `loc-${idx}`,
    label: loc,
    value: loc,
  }));

  return (
    <main className="flex-1 pb-16">
      <Banner />
      <Search locations={locationsList} />
      <HowItWorks />
      <PopularDeals initialCategories={categories} initialVehicles={vehicles} />
      <WhyChoose />
      <Testimonials />
    </main>
  );
}
