"use client";

import { Button } from "@/components/ui/button";
import { RiAddLine, RiFilter3Line, RiSearchLine } from "@remixicon/react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Products Inventory
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Manage all products, stock levels, and vehicle categories.
          </p>
        </div>

        <Button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold text-xs h-9 px-4">
          <RiAddLine className="h-4 w-4 mr-1 shrink-0" />
          <span>Add New Product</span>
        </Button>
      </div>

      <div className="rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <RiSearchLine className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-4 text-xs focus:bg-white focus:border-zinc-400 outline-none"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs font-semibold text-zinc-600"
          >
            <RiFilter3Line className="h-4 w-4 mr-1 shrink-0" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="pb-3 pr-2">Product Name</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Brand</th>
                <th className="pb-3 px-3">Price</th>
                <th className="pb-3 px-3">Stock</th>
                <th className="pb-3 pl-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
              {[
                {
                  name: "Range Rover Sport",
                  category: "SUV",
                  brand: "Land Rover",
                  price: "$260/day",
                  stock: "12 Vehicles",
                  status: "In Stock",
                },
                {
                  name: "Audi S3 Sedan",
                  category: "Sedan",
                  brand: "Audi",
                  price: "$1474/day",
                  stock: "8 Vehicles",
                  status: "In Stock",
                },
                {
                  name: "Blue Nissan GT-R",
                  category: "Sports",
                  brand: "Nissan",
                  price: "$8784/day",
                  stock: "2 Vehicles",
                  status: "Low Stock",
                },
                {
                  name: "Toyota Corolla Hybrid",
                  category: "Economy",
                  brand: "Toyota",
                  price: "$3240/day",
                  stock: "15 Vehicles",
                  status: "In Stock",
                },
              ].map((item) => (
                <tr key={item.name} className="hover:bg-zinc-50/80">
                  <td className="py-3.5 pr-2 font-bold text-zinc-900">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-3">{item.category}</td>
                  <td className="py-3.5 px-3">{item.brand}</td>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">
                    {item.price}
                  </td>
                  <td className="py-3.5 px-3">{item.stock}</td>
                  <td className="py-3.5 pl-3 text-right">
                    <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-[10px] font-bold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
