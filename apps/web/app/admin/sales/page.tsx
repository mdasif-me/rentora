"use client";

import { Button } from "@/components/ui/button";
import { RiAddLine, RiSearchLine } from "@remixicon/react";

export default function SalesPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Sales & Orders
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Track and manage all car rental bookings and customer orders.
          </p>
        </div>

        <Button className="bg-orange-500 text-white hover:bg-orange-600 font-semibold text-xs h-9 px-4">
          <RiAddLine className="h-4 w-4 mr-1 shrink-0" />
          <span>New Order</span>
        </Button>
      </div>

      <div className="rounded-2xl bg-white p-6 border border-zinc-200/80 shadow-2xs flex flex-col space-y-4">
        <div className="relative w-full sm:w-72">
          <RiSearchLine className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search sales..."
            className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-4 text-xs focus:bg-white focus:border-zinc-400 outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="pb-3 pr-2">Order ID</th>
                <th className="pb-3 px-3">Vehicle</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Payment</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 pl-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
              {[
                {
                  id: "#416645453773",
                  vehicle: "Range Rover",
                  customer: "Mike Witzel",
                  payment: "Paypal",
                  amount: "$1099.00",
                  status: "Success",
                },
                {
                  id: "#147784454554",
                  vehicle: "Red Toyota",
                  customer: "Sarah Connor",
                  payment: "Apple Pay",
                  amount: "$600.55",
                  status: "Cancelled",
                },
                {
                  id: "#147784454555",
                  vehicle: "Blue Nissan",
                  customer: "John Doe",
                  payment: "Stripe",
                  amount: "$200.10",
                  status: "Pending",
                },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50/80">
                  <td className="py-3.5 pr-2 font-bold text-blue-600">
                    {row.id}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-zinc-900">
                    {row.vehicle}
                  </td>
                  <td className="py-3.5 px-3">{row.customer}</td>
                  <td className="py-3.5 px-3">{row.payment}</td>
                  <td className="py-3.5 px-3 font-extrabold text-zinc-900">
                    {row.amount}
                  </td>
                  <td className="py-3.5 pl-3 text-right">
                    <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-[10px] font-bold">
                      {row.status}
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
