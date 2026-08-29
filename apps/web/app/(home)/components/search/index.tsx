"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Checkbox } from "@/components/motion/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/motion/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/motion/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { LOCATION_OPTIONS, PLACEHOLDERS, TIME_OPTIONS } from "./constants";
import type { SearchProps } from "./types";

export default function Search({ onSearch, className }: SearchProps) {
  const [pickupEnabled, setPickupEnabled] = useState<boolean>(true);
  const [dropoffEnabled, setDropoffEnabled] = useState<boolean>(true);

  const [pickupCity, setPickupCity] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupTime, setPickupTime] = useState<string>("");

  const [dropoffCity, setDropoffCity] = useState<string>("");
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(undefined);
  const [dropoffTime, setDropoffTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({
      pickupCity: pickupEnabled ? pickupCity : "",
      pickupDate: pickupEnabled ? pickupDate : undefined,
      pickupTime: pickupEnabled ? pickupTime : "",
      dropoffCity: dropoffEnabled ? dropoffCity : "",
      dropoffDate: dropoffEnabled ? dropoffDate : undefined,
      dropoffTime: dropoffEnabled ? dropoffTime : "",
    });
  };

  return (
    <div className={cn("relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14", className)}>
      <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Pick - Up Section */}
          <div
            className={cn(
              "w-full lg:w-auto flex-1 border-b lg:border-b-0 lg:border-r border-zinc-100 pb-4 lg:pb-0 lg:pr-6 transition-opacity duration-200",
              pickupEnabled ? "opacity-100" : "opacity-50",
            )}
          >
            <div className="mb-3 h-5 flex items-center">
              <Checkbox
                checked={pickupEnabled}
                onCheckedChange={setPickupEnabled}
                label="Pick - Up"
                className="font-bold text-xs"
              />
            </div>

            <div className={cn("flex flex-wrap sm:flex-nowrap items-center gap-4 min-h-[44px]", !pickupEnabled && "pointer-events-none")}>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Locations</label>
                <div className="h-6 flex items-center">
                  <Select value={pickupCity} onValueChange={setPickupCity} disabled={!pickupEnabled}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-full text-xs text-muted-foreground shadow-none hover:bg-transparent">
                      <SelectValue placeholder={PLACEHOLDERS.city} />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map((loc) => (
                        <SelectItem key={loc.id} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-zinc-200" aria-hidden="true" />

              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Date</label>
                <div className="h-6 flex items-center">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        type="button"
                        disabled={!pickupEnabled}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left font-medium disabled:cursor-not-allowed leading-tight py-0.5"
                      >
                        {pickupDate ? format(pickupDate, "PPP") : PLACEHOLDERS.date}
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
              </div>

              <div className="hidden sm:block h-8 w-px bg-zinc-200" aria-hidden="true" />

              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Time</label>
                <div className="h-6 flex items-center">
                  <Select value={pickupTime} onValueChange={setPickupTime} disabled={!pickupEnabled}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-full text-xs text-muted-foreground shadow-none hover:bg-transparent">
                      <SelectValue placeholder={PLACEHOLDERS.time} />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={time.id} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Drop - Off Section */}
          <div
            className={cn(
              "w-full lg:w-auto flex-1 pb-4 lg:pb-0 lg:pr-6 transition-opacity duration-200",
              dropoffEnabled ? "opacity-100" : "opacity-50",
            )}
          >
            <div className="mb-3 h-5 flex items-center">
              <Checkbox
                checked={dropoffEnabled}
                onCheckedChange={setDropoffEnabled}
                label="Drop - Off"
                className="font-bold text-xs"
              />
            </div>

            <div className={cn("flex flex-wrap sm:flex-nowrap items-center gap-4 min-h-[44px]", !dropoffEnabled && "pointer-events-none")}>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Locations</label>
                <div className="h-6 flex items-center">
                  <Select value={dropoffCity} onValueChange={setDropoffCity} disabled={!dropoffEnabled}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-full text-xs text-muted-foreground shadow-none hover:bg-transparent">
                      <SelectValue placeholder={PLACEHOLDERS.city} />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map((loc) => (
                        <SelectItem key={loc.id} value={loc.value}>
                          {loc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-zinc-200" aria-hidden="true" />

              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Date</label>
                <div className="h-6 flex items-center">
                  <Popover>
                    <PopoverTrigger>
                      <button
                        type="button"
                        disabled={!dropoffEnabled}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left font-medium disabled:cursor-not-allowed leading-tight py-0.5"
                      >
                        {dropoffDate ? format(dropoffDate, "PPP") : PLACEHOLDERS.date}
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

              <div className="hidden sm:block h-8 w-px bg-zinc-200" aria-hidden="true" />

              <div className="flex-1 min-w-[120px]">
                <label className="text-xs font-bold text-foreground block mb-1">Time</label>
                <div className="h-6 flex items-center">
                  <Select value={dropoffTime} onValueChange={setDropoffTime} disabled={!dropoffEnabled}>
                    <SelectTrigger className="border-0 bg-transparent p-0 h-full text-xs text-muted-foreground shadow-none hover:bg-transparent">
                      <SelectValue placeholder={PLACEHOLDERS.time} />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_OPTIONS.map((time) => (
                        <SelectItem key={time.id} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            <Button type="submit" size="lg" className="w-full lg:w-auto px-8 shadow-md">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
