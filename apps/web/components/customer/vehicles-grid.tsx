"use client";

import React, { useState } from "react";
import { AppCard } from "@/components/container/cards";
import { Button } from "@/components/ui/button";
import { X, Calendar, MapPin, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import type { Vehicle } from "@rentora/types";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface VehiclesGridProps {
  vehicles: Vehicle[];
}

export default function VehiclesGrid({ vehicles }: VehiclesGridProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    dropOffDate: "",
  });

  const handleRentClick = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setIsSuccess(false);
      setFormData((prev) => ({
        ...prev,
        pickUpLocation: vehicle.location || "",
        dropOffLocation: vehicle.location || "",
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          vehicleId: selectedVehicle.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit rental request");
      
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pickUpLocation: "",
        dropOffLocation: "",
        pickUpDate: "",
        dropOffDate: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting your inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => {
          const cardData = {
            id: vehicle.id,
            name: vehicle.name,
            image: vehicle.image || "https://placehold.co/304x388/8d99ae/white.png",
            price: Number(vehicle.pricePerDay),
            priceUnit: "day",
            category: vehicle.category?.name || "Standard",
          };

          return (
            <div key={vehicle.id}>
              <AppCard 
                vehicle={cardData} 
                onRentNow={handleRentClick}
              />
            </div>
          );
        })}
      </div>

      {/* Booking Form Dialog Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl border border-zinc-100 max-w-lg w-full shadow-2xl p-6 relative overflow-y-auto max-h-[90vh] flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-zinc-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">
                  {isSuccess ? "Request Confirmed!" : `Book ${selectedVehicle.name}`}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {isSuccess 
                    ? "Inquiry logged in administrative records" 
                    : `Configure rent duration and customer information.`}
                </p>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isSuccess ? (
              /* Success Dialog content */
              <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-base font-bold text-zinc-900">Rental Request Received</h4>
                <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                  Thank you for submitting your booking interest. Your lead has been generated and logged under our admin system. Our booking desk will review the details and contact you shortly.
                </p>
                <Button 
                  onClick={() => setSelectedVehicle(null)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-6 mt-4 rounded-xl"
                >
                  Close Window
                </Button>
              </div>
            ) : (
              /* Inquiry Form content */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name fields */}
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
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                      <User className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Email / Phone fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                      <Phone className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Locations fields */}
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
                        placeholder="Pick up city"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
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
                        placeholder="Drop off city"
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                      <MapPin className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Date fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Pick-up Date
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="date"
                        name="pickUpDate"
                        value={formData.pickUpDate}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                      <Calendar className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                      Drop-off Date
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="date"
                        name="dropOffDate"
                        value={formData.dropOffDate}
                        onChange={handleInputChange}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-zinc-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      />
                      <Calendar className="absolute left-3 top-3 text-zinc-400 h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end border-t border-zinc-100 pt-4 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedVehicle(null)}
                    className="border-zinc-200 text-zinc-700 text-xs rounded-xl h-10 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl h-10 px-6 shadow-md"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
