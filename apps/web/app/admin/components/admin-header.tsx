"use client";

import { Button } from "@/components/ui/button";
import {
  RiAddLine,
  RiArrowDownSLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
  RiBellLine,
  RiMailLine,
  RiSearchLine,
  RiSettings3Line,
  RiShoppingBagLine,
} from "@remixicon/react";
import Link from "next/link";

interface AdminHeaderProps {
  readonly isSidebarOpen: boolean;
  readonly onToggleSidebar: () => void;
}

export function AdminHeader({
  isSidebarOpen,
  onToggleSidebar,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6 shadow-2xs">
      {/* Left: Brand Logo + Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-xl shadow-xs">
            R
          </div>
          <span className="text-xl font-extrabold text-zinc-900 tracking-tight hidden sm:block">
            Rentora<span className="text-orange-500">.</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? (
            <RiArrowLeftDoubleLine className="h-4 w-4 shrink-0" />
          ) : (
            <RiArrowRightDoubleLine className="h-4 w-4 shrink-0" />
          )}
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:flex items-center w-72">
          <RiSearchLine className="absolute left-3 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-12 text-xs text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-zinc-400 outline-none transition-all"
          />
          <kbd className="absolute right-2 flex h-5 items-center gap-1 rounded bg-zinc-200 px-1.5 text-[10px] font-semibold text-zinc-600">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Right: Actions, Status & Utility Icons */}
      <div className="flex items-center gap-3">
        {/* Coming Soon Dropdown */}
        <div className="hidden lg:flex items-center gap-2 h-9 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs font-semibold text-zinc-700">
          <div className="h-2 w-2 rounded-full bg-zinc-800" />
          <span>Coming Soon</span>
          <RiArrowDownSLine className="h-4 w-4 text-zinc-400" />
        </div>

        {/* Action Buttons */}
        <Button
          size="sm"
          className="bg-orange-500 text-white hover:bg-orange-600 font-semibold px-3 py-1.5 text-xs h-9 shadow-xs"
        >
          <RiAddLine className="h-4 w-4 mr-1 shrink-0" />
          <span>Add New</span>
        </Button>

        <Button
          size="sm"
          className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-3 py-1.5 text-xs h-9 shadow-xs hidden sm:flex"
        >
          <RiShoppingBagLine className="h-4 w-4 mr-1 shrink-0" />
          <span>POS</span>
        </Button>

        {/* Utility Icons */}
        <div className="flex items-center gap-2 border-l border-zinc-200 pl-3">
          {/* Flag */}
          <span
            className="text-lg leading-none select-none px-1"
            title="English (US)"
          >
            🇺🇸
          </span>

          {/* Mail Badge */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Messages"
          >
            <RiMailLine className="h-4 w-4 shrink-0" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              01
            </span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Notifications"
          >
            <RiBellLine className="h-4 w-4 shrink-0" />
          </button>

          {/* Settings */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Settings"
          >
            <RiSettings3Line className="h-4 w-4 shrink-0" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-1">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-300 ring-2 ring-orange-400">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://placehold.co/100x100/f97316/ffffff.png?text=MW"
                alt="Mike Witzel"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
