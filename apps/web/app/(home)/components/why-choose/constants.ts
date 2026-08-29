import { RiMapPin2Fill, RiPhoneFill, RiPriceTag3Fill } from "@remixicon/react";
import type { WhyChooseFeature } from "./types";

export const WHY_CHOOSE_HEADER = {
  title: "Why choose us",
  subtitle:
    "A high-performing web-based car rental system for any rent-a-car company and website",
} as const;

export const WHY_CHOOSE_FEATURES: readonly WhyChooseFeature[] = [
  {
    id: "feat-1",
    title: "Customer Support",
    description:
      "Extremely responsive customer support provided by the team at best car rental UK.",
    icon: RiPhoneFill,
  },
  {
    id: "feat-2",
    title: "Best Price Guarantted",
    description:
      "Extremely best prices for all category people offered at the best car rental UK.",
    icon: RiPriceTag3Fill,
  },
  {
    id: "feat-3",
    title: "Many Location",
    description:
      "Extremely the best location and available near the big cities. Just visit best car rental UK.",
    icon: RiMapPin2Fill,
  },
] as const;

export const MAIN_FEATURE_IMAGE = {
  src: "https://placehold.co/566x528/cbd5e1/475569.png?text=Why+Choose+Us",
  alt: "Why Choose Rentora Car Rental",
  width: 566,
  height: 528,
} as const;

export const BOTTOM_BANNER_IMAGES = [
  {
    id: "bottom-banner-1",
    src: "https://placehold.co/640x360/e2e8f0/64748b.png?text=Car+Rental+Promo+1",
    alt: "Car Rental Special Offer 1",
    width: 640,
    height: 360,
  },
  {
    id: "bottom-banner-2",
    src: "https://placehold.co/640x360/e2e8f0/64748b.png?text=Car+Rental+Promo+2",
    alt: "Car Rental Special Offer 2",
    width: 640,
    height: 360,
  },
] as const;
