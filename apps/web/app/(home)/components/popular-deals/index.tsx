"use client";

import { AppCard } from "@/components/container/cards";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/motion/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import type { PopularDealsProps } from "./types";
import { POPULAR_DEALS_HEADER } from "./constants";

export default function PopularDeals({
  initialCategories = [],
  initialVehicles = [],
  className,
  onRentNow,
}: PopularDealsProps) {
  // Construct dynamic category tabs: "Popular" (all) + DB categories
  const categoriesList = [
    { id: "all", label: "Popular", value: "popular" },
    ...initialCategories.map((c) => ({
      id: c.id,
      label: c.name,
      value: c.id,
    })),
  ];

  // Pagination state (visible cars limit)
  const [visibleLimit, setVisibleLimit] = useState(8);

  const handleShowMoreClick = () => {
    setVisibleLimit((prev) => prev + 8);
  };

  return (
    <motion.section
      id="popular-deals"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("py-20 lg:py-28 bg-muted overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground">
            {POPULAR_DEALS_HEADER.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {POPULAR_DEALS_HEADER.subtitle}
          </p>
        </div>

        <Tabs defaultValue="popular" variant="underline">
          {/* Scrollable Tabs Header */}
          <div className="border-b border-zinc-200 mb-10 overflow-x-auto scrollbar-none">
            <TabsList className="w-full justify-around sm:justify-start gap-6 sm:gap-16 border-b-0 pb-0 bg-transparent">
              {categoriesList.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.value}
                  className="text-base sm:text-lg font-bold py-3 px-2 sm:px-4"
                  indicatorClassName="h-[3px] bg-zinc-900 rounded-full"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tabs Content */}
          {categoriesList.map((cat) => {
            // Filter vehicles belonging to this category
            const filteredVehicles = cat.value === "popular"
              ? initialVehicles
              : initialVehicles.filter((v) => v.categoryId === cat.value);

            // Paginated slice
            const displayedVehicles = filteredVehicles.slice(0, visibleLimit);
            const hasMore = filteredVehicles.length > visibleLimit;

            return (
              <TabsContent key={cat.id} value={cat.value} className="mt-0">
                {displayedVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedVehicles.map((vehicle, idx) => {
                      // Map Vehicle -> AppCardData format
                      const cardData = {
                        id: vehicle.id,
                        name: vehicle.name,
                        image: vehicle.image || "https://placehold.co/304x388/8d99ae/white.png",
                        price: Number(vehicle.pricePerDay),
                        priceUnit: "day",
                        category: vehicle.category?.name || "",
                      };

                      return (
                        <motion.div
                          key={vehicle.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                          <AppCard vehicle={cardData} onRentNow={onRentNow} />
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-zinc-500 font-medium">No vehicles found in this category.</p>
                  </div>
                )}

                {/* Bottom Pagination Bar inside each tab */}
                {filteredVehicles.length > 0 && (
                  <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
                    {hasMore ? (
                      <Button
                        type="button"
                        variant="default"
                        size="lg"
                        onClick={handleShowMoreClick}
                        className="bg-white text-foreground hover:bg-zinc-100 shadow-sm border border-zinc-200 font-medium px-8 py-3 text-sm"
                      >
                        Show more cars
                      </Button>
                    ) : (
                      <p className="text-xs sm:text-sm text-muted-foreground/80 font-medium">
                        Showing all {filteredVehicles.length} cars
                      </p>
                    )}

                    <div className="absolute right-0 text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
                      Total: {filteredVehicles.length} {filteredVehicles.length === 1 ? "Car" : "Cars"}
                    </div>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </motion.section>
  );
}
