"use client";

import {
  CenterMorphModal,
  CenterMorphModalContent,
} from "@/components/motion/center-morph-modal";
import { Table, type TableColumn } from "@/components/motion/table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  RiCalendarEventLine,
  RiCarLine,
  RiEyeLine,
  RiMailLine,
  RiMapPin2Line,
  RiPhoneLine,
} from "@remixicon/react";
import type { Lead } from "@rentora/types";
import Image from "next/image";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export default function LeadsClientPage({
  initialData,
}: {
  initialData: Lead[];
}) {
  const [leads, setLeads] = useState<Lead[]>(
    Array.isArray(initialData) ? initialData : [],
  );
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [processingStatus, setProcessingStatus] = useState<
    "APPROVED" | "REJECTED" | null
  >(null);

  const handleUpdateStatus = async (
    leadId: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    const actionText = status === "APPROVED" ? "approve" : "reject";
    if (
      !confirm(`Are you sure you want to ${actionText} this booking request?`)
    ) {
      return;
    }

    setProcessingStatus(status);
    try {
      const res = await fetch(`${API}/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      // Update local state lists
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status } : l)),
      );
      setSelectedLead((prev) =>
        prev && prev.id === leadId ? { ...prev, status } : prev,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Please try again.");
    } finally {
      setProcessingStatus(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const leadColumns: TableColumn<Lead>[] = [
    {
      key: "firstName",
      header: "Customer",
      align: "left",
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="font-semibold text-zinc-900">
            {row.firstName} {row.lastName}
          </span>
          <span className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
            <RiMailLine className="h-3 w-3 shrink-0 text-zinc-400" />
            {row.email}
          </span>
        </div>
      ),
    },
    {
      key: "vehicle",
      header: "Vehicle Inquired",
      align: "left",
      cell: (row) => (
        <div className="flex items-center gap-2 py-2">
          {row.vehicle?.image ? (
            <div className="h-8 w-12 relative rounded overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
              <Image
                src={row.vehicle.image}
                alt={row.vehicle.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-8 w-12 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
              <RiCarLine className="h-4 w-4 text-zinc-400" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-zinc-900">
              {row.vehicle?.name || "Unknown Vehicle"}
            </span>
            <span className="text-xs text-zinc-500">
              {row.vehicle?.category?.name || row.vehicle?.type || "Standard"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "pickUpLocation",
      header: "Pick-up",
      align: "left",
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="text-sm font-medium text-zinc-900 flex items-center gap-1">
            <RiMapPin2Line className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            {row.pickUpLocation}
          </span>
          <span className="text-xs text-zinc-500 mt-0.5">
            {formatDate(row.pickUpDate)}
          </span>
        </div>
      ),
    },
    {
      key: "dropOffLocation",
      header: "Drop-off",
      align: "left",
      cell: (row) => (
        <div className="flex flex-col py-2">
          <span className="text-sm font-medium text-zinc-900 flex items-center gap-1">
            <RiMapPin2Line className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            {row.dropOffLocation}
          </span>
          <span className="text-xs text-zinc-500 mt-0.5">
            {formatDate(row.dropOffDate)}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      align: "center",
      cell: (row) => {
        const status = row.status || "PENDING";
        const isApproved = status === "APPROVED";
        const isRejected = status === "REJECTED";
        return (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border",
              isApproved &&
                "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400",
              isRejected &&
                "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/20 dark:text-rose-400",
              !isApproved &&
                !isRejected &&
                "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400",
            )}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: "id",
      header: "",
      align: "right",
      width: "8%",
      cell: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedLead(row)}
          className="border-zinc-200 text-zinc-700 hover:text-zinc-900 gap-1.5"
        >
          <RiEyeLine className="h-4 w-4" />
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-6 max-w-[1600px] mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Leads & Inquiries
        </h1>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          Review vehicle rental requests submitted by customers.
        </p>
      </div>

      <Card className="shadow-sm border-zinc-200 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40 shrink-0">
          <CardTitle className="text-base font-bold text-zinc-900">
            Leads List
          </CardTitle>
        </CardHeader>
        <div className="p-0 overflow-hidden rounded-b-xl border-t-0 flex-1 min-h-[500px]">
          <Table
            data={leads}
            columns={leadColumns}
            rowHeight={64}
            className="border-none rounded-none h-full"
            emptyState="No rental inquiries found."
          />
        </div>
      </Card>

      {/* Lead Detail Modal */}
      <CenterMorphModal
        open={selectedLead !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedLead(null);
        }}
      >
        <CenterMorphModalContent
          ariaLabel="Lead details"
          className="max-w-[34rem]"
        >
          {selectedLead && (
            <div className="p-6 sm:p-8 flex flex-col space-y-6">
              <div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold mb-2 border",
                    selectedLead.status === "APPROVED" &&
                      "bg-emerald-50 text-emerald-700 border-emerald-100",
                    selectedLead.status === "REJECTED" &&
                      "bg-rose-50 text-rose-700 border-rose-100",
                    (selectedLead.status === "PENDING" ||
                      !selectedLead.status) &&
                      "bg-orange-50 text-orange-700 border-orange-100",
                  )}
                >
                  {selectedLead.status === "APPROVED" && "Approved"}
                  {selectedLead.status === "REJECTED" && "Rejected"}
                  {(selectedLead.status === "PENDING" ||
                    !selectedLead.status) &&
                    "Rental Request"}
                </span>
                <h2 className="text-xl font-bold text-zinc-900">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  Submitted on {formatDate(selectedLead.createdAt.toString())}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Contact details
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="flex items-center gap-2.5 text-sm text-zinc-700">
                    <RiMailLine className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="font-medium">{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-zinc-700">
                    <RiPhoneLine className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span className="font-medium">{selectedLead.phone}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Vehicle requested
                </h3>
                {selectedLead.vehicle ? (
                  <div className="flex items-center gap-4">
                    {selectedLead.vehicle.image && (
                      <div className="h-12 w-20 relative rounded-md overflow-hidden bg-white border border-zinc-200 shrink-0">
                        <Image
                          src={selectedLead.vehicle.image}
                          alt={selectedLead.vehicle.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-900 text-sm">
                        {selectedLead.vehicle.name}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {selectedLead.vehicle.category?.name ||
                          selectedLead.vehicle.type}{" "}
                        • ${selectedLead.vehicle.pricePerDay}/day
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500">
                    Vehicle details not found (ID: {selectedLead.vehicleId})
                  </p>
                )}
              </div>

              {/* Route & Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Pick-up details
                  </h4>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                      <RiMapPin2Line className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      {selectedLead.pickUpLocation}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <RiCalendarEventLine className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      {formatDate(selectedLead.pickUpDate)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Drop-off details
                  </h4>
                  <div className="space-y-1">
                    <span className="text-sm font-semibold text-zinc-900 flex items-center gap-1">
                      <RiMapPin2Line className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      {selectedLead.dropOffLocation}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <RiCalendarEventLine className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      {formatDate(selectedLead.dropOffDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "pt-4 border-t border-zinc-100 gap-3",
                  selectedLead.status === "PENDING" || !selectedLead.status
                    ? "grid grid-cols-2"
                    : "flex flex-col",
                )}
              >
                {selectedLead.status === "PENDING" || !selectedLead.status ? (
                  <>
                    <Button
                      variant="outline"
                      disabled={processingStatus !== null}
                      className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl"
                      onClick={() =>
                        handleUpdateStatus(selectedLead.id, "REJECTED")
                      }
                    >
                      {processingStatus === "REJECTED"
                        ? "Rejecting..."
                        : "Reject Request"}
                    </Button>
                    <Button
                      disabled={processingStatus !== null}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                      onClick={() =>
                        handleUpdateStatus(selectedLead.id, "APPROVED")
                      }
                    >
                      {processingStatus === "APPROVED"
                        ? "Approving..."
                        : "Approve Request"}
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl"
                    onClick={() => setSelectedLead(null)}
                  >
                    Close Details
                  </Button>
                )}
              </div>
            </div>
          )}
        </CenterMorphModalContent>
      </CenterMorphModal>
    </div>
  );
}
