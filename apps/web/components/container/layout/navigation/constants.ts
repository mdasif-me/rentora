import type { AuthAction, NavItem } from "./types";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "home", label: "Home", href: "#hero" },
  { id: "how-it-work", label: "How it Work", href: "#how-it-works" },
  { id: "rental-detals", label: "Rental Detals", href: "#popular-deals" },
  { id: "why-choose-us", label: "Why Choose Us", href: "#why-choose" },
  { id: "testimonial", label: "Testimonial", href: "#testimonials" },
] as const;

export const AUTH_ACTIONS: readonly AuthAction[] = [
  {
    id: "register",
    label: "Register",
    href: "#register",
    variant: "link",
    size: "default",
  },
  {
    id: "admin",
    label: "Admin Panel",
    href: "/admin",
    variant: "default",
    size: "default",
  },
] as const;

export const BRAND_NAME = "Rentora";
