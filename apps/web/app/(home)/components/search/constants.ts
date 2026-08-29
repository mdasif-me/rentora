import type { LocationOption, TimeOption } from "./types";

export const LOCATION_OPTIONS: readonly LocationOption[] = [
  { id: "loc-1", label: "London, UK", value: "london" },
  { id: "loc-2", label: "Manchester, UK", value: "manchester" },
  { id: "loc-3", label: "Birmingham, UK", value: "birmingham" },
  { id: "loc-4", label: "Edinburgh, UK", value: "edinburgh" },
] as const;

export const TIME_OPTIONS: readonly TimeOption[] = [
  { id: "time-1", label: "09:00 AM", value: "09:00" },
  { id: "time-2", label: "10:00 AM", value: "10:00" },
  { id: "time-3", label: "12:00 PM", value: "12:00" },
  { id: "time-4", label: "02:00 PM", value: "14:00" },
  { id: "time-5", label: "06:00 PM", value: "18:00" },
] as const;

export const PLACEHOLDERS = {
  city: "Select your city",
  date: "Select your date",
  time: "Select your time",
} as const;
