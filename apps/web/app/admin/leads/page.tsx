export const dynamic = "force-dynamic";
import type { Lead } from "@rentora/types";
import LeadsClientPage from "./client-page";

async function getLeads(): Promise<Lead[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"}/leads`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : json;
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return [];
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();
  return <LeadsClientPage initialData={leads} />;
}
