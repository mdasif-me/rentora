"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FOOTER_BRAND,
  FOOTER_LEGAL_LINKS,
  FOOTER_LINK_GROUPS,
  FOOTER_SOCIALS,
} from "./constants";
import type { FooterProps } from "./types";

export default function Footer({ className }: FooterProps) {
  return (
    <footer id="footer" className={cn("bg-zinc-200/70 pt-16 pb-8 lg:pt-20 lg:pb-12 border-t border-zinc-200/80", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <Link href="/" className="text-3xl font-extrabold text-foreground tracking-tight">
              {FOOTER_BRAND.logoText}
            </Link>

            <p className="text-sm font-medium text-foreground/75 max-w-xs leading-relaxed">
              {FOOTER_BRAND.vision}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {FOOTER_SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-700 shadow-sm hover:shadow-md hover:text-foreground transition-all duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.id} className="flex flex-col space-y-4">
                <h4 className="text-base font-bold text-foreground tracking-tight">
                  {group.title}
                </h4>
                <ul className="flex flex-col space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="border-t border-zinc-300/80 pt-8 mt-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold text-foreground">
            {FOOTER_BRAND.copyright}
          </p>

          <div className="flex items-center gap-8">
            {FOOTER_LEGAL_LINKS.map((legal) => (
              <Link
                key={legal.label}
                href={legal.href}
                className="text-sm font-bold text-foreground hover:underline transition-all"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
