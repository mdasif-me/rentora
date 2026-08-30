export const dynamic = "force-dynamic";
import type { Category } from "@rentora/types";
import CategoriesClientPage from "./client-page";

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}/categories`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json.data) ? json.data : json;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesClientPage initialData={categories} />;
}
