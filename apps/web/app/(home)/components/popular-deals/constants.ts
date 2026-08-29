import type { AppCardData } from "@/components/container/cards";
import type { PopularDealCategory } from "./types";

export const POPULAR_DEALS_HEADER = {
  title: "Most popular car rental deals",
  subtitle:
    "A high-performing web-based car rental system for any rent-a-car company and website",
} as const;

export const POPULAR_DEALS_CATEGORIES: readonly PopularDealCategory[] = [
  { id: "cat-1", label: "Popular", value: "popular" },
  { id: "cat-2", label: "Large Car", value: "large-car" },
  { id: "cat-3", label: "Small Car", value: "small-car" },
  { id: "cat-4", label: "Exclusive Car", value: "exclusive-car" },
] as const;

export const TOTAL_VEHICLES_COUNT = 120;

export const POPULAR_VEHICLES: readonly AppCardData[] = [
  {
    id: "veh-1",
    name: "All New Rush",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 72.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-2",
    name: "CR-V Turbo",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 85.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-3",
    name: "All New Terios",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 74.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-4",
    name: "Nuovo MG ZS",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 80.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-5",
    name: "All New Rush Sport",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 72.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-6",
    name: "CR-V Hybrid",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 88.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-7",
    name: "All New Terios R",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 76.0,
    priceUnit: "day",
    category: "popular",
  },
  {
    id: "veh-8",
    name: "MG ZS EV",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 92.0,
    priceUnit: "day",
    category: "popular",
  },
] as const;

export const LARGE_CAR_VEHICLES: readonly AppCardData[] = [
  {
    id: "veh-large-1",
    name: "Land Cruiser V8",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 150.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-2",
    name: "Range Rover Sport",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 180.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-3",
    name: "BMW X7 xDrive",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 175.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-4",
    name: "Audi Q8 Quattro",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 165.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-5",
    name: "Mercedes GLS 450",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 190.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-6",
    name: "Cadillac Escalade",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 210.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-7",
    name: "Volvo XC90 Recharge",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 140.0,
    priceUnit: "day",
    category: "large-car",
  },
  {
    id: "veh-large-8",
    name: "Porsche Cayenne",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 195.0,
    priceUnit: "day",
    category: "large-car",
  },
] as const;

export const SMALL_CAR_VEHICLES: readonly AppCardData[] = [
  {
    id: "veh-small-1",
    name: "Mini Cooper S",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 55.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-2",
    name: "Volkswagen Polo",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 48.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-3",
    name: "Ford Fiesta ST",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 50.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-4",
    name: "Toyota Yaris Hybrid",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 52.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-5",
    name: "Fiat 500e",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 45.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-6",
    name: "Honda Jazz Sport",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 49.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-7",
    name: "Peugeot 208 GT",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 53.0,
    priceUnit: "day",
    category: "small-car",
  },
  {
    id: "veh-small-8",
    name: "Hyundai i20 N Line",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 51.0,
    priceUnit: "day",
    category: "small-car",
  },
] as const;

export const EXCLUSIVE_CAR_VEHICLES: readonly AppCardData[] = [
  {
    id: "veh-ex-1",
    name: "Porsche 911 GT3",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 350.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-2",
    name: "Aston Martin DB11",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 420.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-3",
    name: "Ferrari F8 Tributo",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 550.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-4",
    name: "Lamborghini Huracán",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 580.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-5",
    name: "Bentley Continental GT",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 480.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-6",
    name: "Rolls-Royce Ghost",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 750.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-7",
    name: "McLaren 720S",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 600.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
  {
    id: "veh-ex-8",
    name: "Audi R8 Performance",
    image: "https://placehold.co/304x388/8d99ae/white.png",
    price: 390.0,
    priceUnit: "day",
    category: "exclusive-car",
  },
] as const;

export const CATEGORY_VEHICLES_MAP: Record<string, readonly AppCardData[]> = {
  popular: POPULAR_VEHICLES,
  "large-car": LARGE_CAR_VEHICLES,
  "small-car": SMALL_CAR_VEHICLES,
  "exclusive-car": EXCLUSIVE_CAR_VEHICLES,
};
