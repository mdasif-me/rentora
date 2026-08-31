"use client";

import {
  CenterMorphModal,
  CenterMorphModalContent,
} from "@/components/motion/center-morph-modal";
import { Checkbox } from "@/components/motion/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/motion/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiAddLine, RiArrowLeftLine } from "@remixicon/react";
import type { Category } from "@rentora/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface Props {
  categories: Category[];
}

export default function CreateVehicleClientPage({ categories: initialCategories }: Props) {
  const router = useRouter();

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [transmission, setTransmission] = useState("Auto");
  const [categories, setCategories] = useState<Category[]>(
    Array.isArray(initialCategories) ? initialCategories : [],
  );

  
  const [modalOpen, setModalOpen] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState("");
  const [catIsActive, setCatIsActive] = useState(true);

  

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCatLoading(true);
    setCatError("");

    const formData = new FormData(e.currentTarget);
    formData.set("isActive", String(catIsActive));

    try {
      const res = await fetch(`${API}/categories`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to create category");
      const json = await res.json();
      const newCategory: Category = json.data ?? json;
      setCategories((prev) => [...prev, newCategory]);
      setCategoryId(newCategory.id);
      setModalOpen(false);
      setCatIsActive(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setCatError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCatLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("categoryId", categoryId);
    formData.set("transmission", transmission);

    try {
      const res = await fetch(`${API}/vehicles`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to create vehicle");
      router.push("/admin/vehicles");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col space-y-6 mx-auto pb-12">
      {}
      <div className="flex items-center gap-4">
        <Link href="/admin/vehicles">
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-zinc-200">
            <RiArrowLeftLine className="h-4 w-4 text-zinc-600" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Create Vehicle</h1>
          <p className="text-sm text-zinc-500 font-medium">Add a new vehicle to the system.</p>
        </div>
      </div>

      <Card className="shadow-sm border-zinc-200">
        <CardHeader className="border-b border-border/40 pb-4">
          <CardTitle className="text-lg font-bold text-zinc-900">Vehicle Details</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {}
          <CenterMorphModal open={modalOpen} onOpenChange={setModalOpen}>
            <CenterMorphModalContent ariaLabel="Create category" className="max-w-[38rem]">
              <div className="p-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-1">New Category</h2>
                <p className="text-sm text-zinc-500 mb-6">
                  Add a new vehicle category to the system.
                </p>

                <form onSubmit={handleCreateCategory} className="flex flex-col space-y-5">
                  {catError && (
                    <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg font-medium">
                      {catError}
                    </div>
                  )}

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="cat-name" className="text-sm font-semibold text-zinc-700">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      id="cat-name"
                      name="name"
                      className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      placeholder="e.g. SUV"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="cat-description" className="text-sm font-semibold text-zinc-700">
                      Description
                    </label>
                    <textarea
                      id="cat-description"
                      name="description"
                      rows={3}
                      className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 resize-none"
                      placeholder="Short description (optional)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="cat-order" className="text-sm font-semibold text-zinc-700">
                        Order
                      </label>
                      <input
                        type="number"
                        min="0"
                        id="cat-order"
                        name="order"
                        className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        placeholder="e.g. 1"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-sm font-semibold text-zinc-700">Status</label>
                      <div className="flex items-center h-11">
                        <Checkbox
                          checked={catIsActive}
                          onCheckedChange={setCatIsActive}
                          label="Active"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="cat-image" className="text-sm font-semibold text-zinc-700">
                      Image (Optional)
                    </label>
                    <input
                      type="file"
                      id="cat-image"
                      name="image"
                      accept="image/*"
                      className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 border-zinc-200 h-12 text-base"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={catLoading}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 text-base"
                    >
                      {catLoading ? "Creating..." : "Create Category"}
                    </Button>
                  </div>
                </form>
              </div>
            </CenterMorphModalContent>
          </CenterMorphModal>

          {}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-sm rounded-lg font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-zinc-700">
                  Vehicle Name *
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g. Toyota Camry"
                />
              </div>

              {}
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-zinc-700">Category *</label>
                  {}
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <RiAddLine className="h-3.5 w-3.5" />
                    New category
                  </button>
                </div>

                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="__none" disabled>
                        No categories available
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="type" className="text-sm font-semibold text-zinc-700">
                  Type *
                </label>
                <input
                  required
                  type="text"
                  id="type"
                  name="type"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  placeholder="e.g. Standard"
                />
              </div>

              {}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="pricePerDay" className="text-sm font-semibold text-zinc-700">
                  Price Per Day ($) *
                </label>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  id="pricePerDay"
                  name="pricePerDay"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  placeholder="e.g. 50"
                />
              </div>

              {}
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-zinc-700">Transmission *</label>
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Auto">Auto</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="fuel" className="text-sm font-semibold text-zinc-700">
                  Fuel *
                </label>
                <input
                  required
                  type="text"
                  id="fuel"
                  name="fuel"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  placeholder="e.g. Petrol, Electric"
                />
              </div>

              {}
              <div className="flex flex-col space-y-1.5 sm:col-span-2">
                <label htmlFor="location" className="text-sm font-semibold text-zinc-700">
                  Location *
                </label>
                <input
                  required
                  type="text"
                  id="location"
                  name="location"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  placeholder="e.g. New York"
                />
              </div>

              {}
              <div className="flex flex-col space-y-1.5 sm:col-span-2">
                <label htmlFor="image" className="text-sm font-semibold text-zinc-700">
                  Vehicle Image (Optional)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
              >
                {loading ? "Creating..." : "Create Vehicle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
