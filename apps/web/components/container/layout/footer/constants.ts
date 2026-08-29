import {
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterFill,
} from "@remixicon/react";
import type { FooterLinkGroup, SocialLink } from "./types";

export const FOOTER_BRAND = {
  logoText: "Rentora",
  vision:
    "Our vision is to provide convenience and help increase your sales business.",
  copyright: "©2026 Rentora. All rights reserved",
} as const;

export const FOOTER_SOCIALS: readonly SocialLink[] = [
  {
    id: "social-fb",
    label: "Facebook",
    href: "https://facebook.com",
    icon: RiFacebookFill,
  },
  {
    id: "social-tw",
    label: "Twitter",
    href: "https://twitter.com",
    icon: RiTwitterFill,
  },
  {
    id: "social-ig",
    label: "Instagram",
    href: "https://instagram.com",
    icon: RiInstagramLine,
  },
] as const;

export const FOOTER_LINK_GROUPS: readonly FooterLinkGroup[] = [
  {
    id: "grp-about",
    title: "About",
    links: [
      { label: "How it works", href: "#" },
      { label: "Featured", href: "#" },
      { label: "Partnership", href: "#" },
      { label: "Business Relation", href: "#" },
    ],
  },
  {
    id: "grp-community",
    title: "Community",
    links: [
      { label: "Events", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Podcast", href: "#" },
      { label: "Invite a friend", href: "#" },
    ],
  },
  {
    id: "grp-socials",
    title: "Socials",
    links: [
      { label: "Discord", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
    ],
  },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy & Policy", href: "#" },
  { label: "Terms & Condition", href: "#" },
] as const;
