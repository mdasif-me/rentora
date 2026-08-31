"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import Image from "next/image";
import { useState } from "react";
import type { AppCardProps } from "./app-card.types";

export function AppCard({
  vehicle,
  onFavoriteToggle,
  onRentNow,
  className,
}: AppCardProps) {
  const [isFav, setIsFav] = useState<boolean>(Boolean(vehicle.isFavorite));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav((prev) => !prev);
    onFavoriteToggle?.(vehicle.id);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 h-90 sm:h-100 w-full transition-all duration-300 hover:shadow-xl group",
        className,
      )}
    >
      {}
      <Image
        src={vehicle.image}
        alt={vehicle.name}
        fill
        unoptimized
        className="object-cover w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
      />

      {}
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="text-base font-bold text-white tracking-tight drop-shadow-sm">
          {vehicle.name}
        </h3>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="text-white/80 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-white/20"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? (
            <RiHeartFill className="h-5 w-5 text-red-500 shrink-0" />
          ) : (
            <RiHeartLine className="h-5 w-5 shrink-0" />
          )}
        </button>
      </div>

      {}
      <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-bold text-white drop-shadow-sm">
            ${vehicle.price.toFixed(2)}
          </span>
          <span className="text-xs font-normal text-white/80">
            / {vehicle.priceUnit ?? "day"}
          </span>
        </div>

        <Button
          type="button"
          onClick={() => onRentNow?.(vehicle.id)}
          className="bg-white text-zinc-900 font-semibold hover:bg-zinc-100 shadow-sm rounded-lg px-4 py-2 text-xs"
        >
          Rent Now
        </Button>
      </div>
    </div>
  );
}
