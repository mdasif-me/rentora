"use client";

import { Button } from "@/components/ui/button";

export default function CreateProductPage() {
  return (
    <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Create New Product
        </h1>
        <p className="text-xs text-zinc-500 font-medium mt-1">
          Add a new vehicle or product details to your rental catalog.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-zinc-800">
              Vehicle Name
            </label>
            <input
              type="text"
              placeholder="e.g. Range Rover Sport V8"
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs focus:bg-white focus:border-zinc-400 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-zinc-800">
              Rental Price ($ / Day)
            </label>
            <input
              type="number"
              placeholder="e.g. 260"
              className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs focus:bg-white focus:border-zinc-400 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-zinc-800">Category</label>
            <select className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs focus:bg-white focus:border-zinc-400 outline-none">
              <option>SUV</option>
              <option>Sedan</option>
              <option>Sports</option>
              <option>Economy</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-zinc-800">Brand</label>
            <select className="h-10 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-xs focus:bg-white focus:border-zinc-400 outline-none">
              <option>Land Rover</option>
              <option>Audi</option>
              <option>Toyota</option>
              <option>Nissan</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white h-9 text-xs font-semibold px-6"
          >
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
}
