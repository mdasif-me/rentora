"use client";

import React, { useState } from "react";
import { AppCard } from "@/components/container/cards";
import BookingModal from "@/components/customer/booking-modal";
import type { Vehicle } from "@rentora/types";

interface VehiclesGridProps {
  vehicles: Vehicle[];
}

export default function VehiclesGrid({ vehicles }: VehiclesGridProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleRentClick = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
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

      <BookingModal
        vehicle={selectedVehicle}
        isOpen={selectedVehicle !== null}
        onClose={() => setSelectedVehicle(null)}
      />
    </>
  );
}
