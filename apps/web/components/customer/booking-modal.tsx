"use client";

import {
  CenterMorphModal,
  CenterMorphModalContent,
} from "@/components/motion/center-morph-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/motion/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { Vehicle } from "@rentora/types";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import React, { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface BookingModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({
  vehicle,
  isOpen,
  onClose,
}: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickUpLocation: "",
    dropOffLocation: "",
  });

  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(undefined);

  const [prevVehicleId, setPrevVehicleId] = useState<string | null>(null);

  // Initialize form state when vehicle selection changes during rendering
  if (vehicle && vehicle.id !== prevVehicleId) {
    setPrevVehicleId(vehicle.id);
    setIsSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      pickUpLocation: vehicle.location || "",
      dropOffLocation: vehicle.location || "",
    });
    setPickupDate(undefined);
    setDropoffDate(undefined);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || isSubmitting || !pickupDate || !dropoffDate) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vehicleId: vehicle.id,
          pickUpDate: pickupDate.toISOString(),
          dropOffDate: dropoffDate.toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to submit booking inquiry");

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert(
        "Something went wrong while submitting your inquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CenterMorphModal
      open={isOpen}
      onOpenChange={(val) => {
        if (!val) onClose();
      }}
    >
      <CenterMorphModalContent
        ariaLabel="Car Rental Booking Modal"
        className="max-w-[560px] md:max-w-[620px] p-8 md:p-10"
      >
        {vehicle && (
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="border-b border-zinc-100 pb-3">
              <h3 className="text-base font-bold text-zinc-950">
                {isSuccess ? "Request Confirmed!" : `Book ${vehicle.name}`}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {isSuccess
                  ? "Inquiry logged in administrative records"
                  : "Please supply customer information and dates."}
              </p>
            </div>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">
                  Rental Request Received
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Thank you for submitting your booking interest. Your lead has
                  been generated and logged under our admin system. Our booking
                  desk will review the details and contact you shortly.
                </p>
                <Button
                  onClick={onClose}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-6 mt-4 rounded-xl"
                >
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <User className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <User className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <Mail className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <Phone className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleInputChange}
                        placeholder="Location"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <MapPin className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Drop-off Location
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="dropOffLocation"
                        value={formData.dropOffLocation}
                        onChange={handleInputChange}
                        placeholder="Location"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-sm"
                      />
                      <MapPin className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Pick-up Date */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Pick-up Date
                    </label>
                    <Popover className="w-full">
                      <PopoverTrigger>
                        <button
                          type="button"
                          className="w-full h-10 px-3 rounded-xl border border-zinc-200 text-xs text-left font-medium text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex items-center gap-2 shadow-sm bg-white"
                        >
                          <CalendarIcon className="h-4 w-4 text-zinc-400 shrink-0" />
                          <span>
                            {pickupDate
                              ? format(pickupDate, "PPP")
                              : "Select Date"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 border-0 bg-transparent shadow-none">
                        <Calendar
                          mode="single"
                          selected={pickupDate}
                          onSelect={setPickupDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Drop-off Date */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Drop-off Date
                    </label>
                    <Popover className="w-full">
                      <PopoverTrigger>
                        <button
                          type="button"
                          className="w-full h-10 px-3 rounded-xl border border-zinc-200 text-xs text-left font-medium text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 flex items-center gap-2 shadow-sm bg-white"
                        >
                          <CalendarIcon className="h-4 w-4 text-zinc-400 shrink-0" />
                          <span>
                            {dropoffDate
                              ? format(dropoffDate, "PPP")
                              : "Select Date"}
                          </span>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 border-0 bg-transparent shadow-none">
                        <Calendar
                          mode="single"
                          selected={dropoffDate}
                          onSelect={setDropoffDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 justify-end border-t border-zinc-100 pt-4 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-zinc-200 text-zinc-700 text-xs rounded-xl h-10 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !pickupDate || !dropoffDate}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl h-10 px-6 shadow-md"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </CenterMorphModalContent>
    </CenterMorphModal>
  );
}
