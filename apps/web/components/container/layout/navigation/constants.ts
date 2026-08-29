import type { NavItem, AuthAction } from "./types";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "how-it-work", label: "How it Work", href: "#how-it-works" },
  { id: "rental-detals", label: "Rental Detals", href: "#vehicles" },
  { id: "why-choose-us", label: "Why Choose Us", href: "#why-us" },
  { id: "testimonial", label: "Testimonial", href: "#testimonials" },
] as const;

export const AUTH_ACTIONS: readonly AuthAction[] = [
  { id: "register", label: "Register", href: "#register", variant: "link", size: "default" },
  { id: "login", label: "Login", href: "#login", variant: "default", size: "default" },
] as const;

export const BRAND_NAME = "Rentora";
