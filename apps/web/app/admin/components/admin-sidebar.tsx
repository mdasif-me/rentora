"use client";

import { cn } from "@/lib/utils";
import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_SECTIONS } from "./admin-sidebar.constants";

interface AdminSidebarProps {
  readonly isOpen: boolean;
}

export function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col border-r border-zinc-200 bg-white pt-16 transition-all duration-300 overflow-y-auto scrollbar-none",
        isOpen ? "w-60" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0",
      )}
    >
      <div className="flex flex-col space-y-6 p-4">
        {ADMIN_NAV_SECTIONS.map((section) => (
          <div key={section.id} className="flex flex-col space-y-1.5">
            {isOpen ? (
              <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {section.sectionTitle}
              </span>
            ) : null}

            <div className="flex flex-col space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                      isActive
                        ? "bg-orange-100/70 text-orange-600 shadow-2xs"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                      !isOpen && "justify-center px-0",
                    )}
                    title={item.label}
                  >
                    {Icon ? (
                      <Icon
                        className={cn(
                          "h-4.5 w-4.5 shrink-0",
                          isActive ? "text-orange-600" : "text-zinc-500",
                        )}
                      />
                    ) : null}

                    {isOpen ? (
                      <span className="flex-1 truncate tracking-tight">
                        {item.label}
                      </span>
                    ) : null}

                    {isOpen && item.id === "nav-dashboard" ? (
                      <RiArrowDownSLine className="h-4 w-4 text-orange-500 shrink-0" />
                    ) : isOpen && item.id === "nav-super-admin" ? (
                      <RiArrowRightSLine className="h-4 w-4 text-zinc-400 shrink-0" />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
