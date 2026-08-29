import {
  RiCalendarEventFill,
  RiCarFill,
  RiMapPin2Fill,
} from "@remixicon/react";
import type { HowItWorksStep } from "./types";

export const HOW_IT_WORKS_HEADER = {
  title: "How it works",
  subtitle:
    "A high-performing web-based car rental system for any rent-a-car company and website",
} as const;

export const HOW_IT_WORKS_STEPS: readonly HowItWorksStep[] = [
  {
    id: "step-1",
    title: "Choose Location",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: RiMapPin2Fill,
  },
  {
    id: "step-2",
    title: "Pick-up Date",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: RiCalendarEventFill,
  },
  {
    id: "step-3",
    title: "Book your car",
    description:
      "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
    icon: RiCarFill,
  },
] as const;
