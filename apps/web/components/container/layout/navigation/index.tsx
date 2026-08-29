"use client";

import { Drawer } from "@/components/motion/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import Link from "next/link";
import { useState } from "react";
import { AUTH_ACTIONS, BRAND_NAME, NAV_ITEMS } from "./constants";
import type { NavigationProps } from "./types";

export default function Navigation({ className }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-extrabold text-2xl tracking-tight">
          {BRAND_NAME}
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-7 text-base font-medium text-muted-foreground">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <span className="h-4 w-px bg-border select-none" aria-hidden="true" />

          <div className="flex items-center gap-2">
            {AUTH_ACTIONS.map((action) => (
              <a
                key={action.id}
                href={action.href}
                className={cn(
                  buttonVariants({
                    variant: action.variant,
                    size: action.size ?? "default",
                  }),
                  "text-base font-medium",
                )}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <RiMenuLine className="h-6 w-6 text-foreground" />
        </Button>
      </div>

      <Drawer
        open={isMobileOpen}
        onOpenChange={setIsMobileOpen}
        side="right"
        ariaLabel="Mobile Navigation Drawer"
      >
        <div className="flex flex-col h-full p-6 bg-background">
          <div className="flex items-center justify-between pb-6">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="font-extrabold text-xl tracking-tight"
            >
              {BRAND_NAME}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close Navigation Drawer"
            >
              <RiCloseLine className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
          <hr />

          <nav className="flex flex-col gap-4 py-6 text-base font-medium text-foreground">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="hover:text-blue-600 transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 mt-auto border-t border-border">
            {AUTH_ACTIONS.map((action) => (
              <a
                key={action.id}
                href={action.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  buttonVariants({ variant: action.variant, size: "lg" }),
                  "w-full justify-center text-center text-base font-medium",
                )}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
