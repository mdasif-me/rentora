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
import {
  CATEGORY_VEHICLES_MAP,
  POPULAR_DEALS_CATEGORIES,
  POPULAR_DEALS_HEADER,
  TOTAL_VEHICLES_COUNT,
} from "./constants";
import type { PopularDealsProps } from "./types";

export default function PopularDeals({
  className,
  onShowMoreCars,
  onRentNow,
}: PopularDealsProps) {
  const handleShowMoreClick = () => {
    // TODO: Implement show more car pagination / API integration for dynamic vehicle loading
    onShowMoreCars?.();
  };

  return (
    <section
      className={cn("py-20 lg:py-28 bg-muted overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground">
            {POPULAR_DEALS_HEADER.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {POPULAR_DEALS_HEADER.subtitle}
          </p>
        </div>

        <Tabs defaultValue="popular" variant="underline">
          <div className="border-b border-zinc-200 mb-10 overflow-x-auto scrollbar-none">
            <TabsList className="w-full justify-around sm:justify-start gap-6 sm:gap-16 border-b-0 pb-0 bg-transparent">
              {POPULAR_DEALS_CATEGORIES.map((cat) => (
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

          {POPULAR_DEALS_CATEGORIES.map((cat) => {
            const vehicles = CATEGORY_VEHICLES_MAP[cat.value] ?? [];
            return (
              <TabsContent key={cat.id} value={cat.value} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {vehicles.map((vehicle) => (
                    <AppCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onRentNow={onRentNow}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Bottom Pagination Bar */}
        <div className="relative mt-12 sm:mt-16 flex items-center justify-center">
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={handleShowMoreClick}
            className="bg-white text-foreground hover:bg-zinc-100 shadow-sm border border-zinc-200 font-medium px-8 py-3 text-sm"
          >
            Show more car
          </Button>

          <div className="absolute right-0 text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
            {TOTAL_VEHICLES_COUNT} Car
          </div>
        </div>
      </div>
    </section>
  );
}
