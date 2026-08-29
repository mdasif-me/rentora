"use client";

import {
  AnimatedSidebar,
  AnimatedSidebarClose,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupContent,
  AnimatedSidebarGroupLabel,
  AnimatedSidebarHeader,
  AnimatedSidebarInset,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuItem,
  AnimatedSidebarMenuSub,
  AnimatedSidebarMenuSubButton,
  AnimatedSidebarMenuSubItem,
  AnimatedSidebarProvider,
  AnimatedSidebarRail,
  AnimatedSidebarTrigger,
} from "@/components/motion/animated-sidebar";
import {
  Building2,
  ChevronRight,
  ChevronsUpDown,
  CircleUserRound,
  Inbox,
  LayoutGrid,
  ListTodo,
  NotebookTabs,
  PanelLeft,
  Search,
  Sparkles,
  Target,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SubItem {
  label: string;
  href: string;
}

interface DestinationItem {
  label: string;
  href: string;
  icon: typeof CircleUserRound;
  children?: SubItem[];
}

const destinations: DestinationItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutGrid,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Building2,
    children: [
      { label: "All Products", href: "/admin/products" },
      { label: "Create Product", href: "/admin/create-product" },
      { label: "Category", href: "/admin/category" },
    ],
  },
  {
    label: "Sales",
    href: "/admin/sales",
    icon: Target,
    children: [
      { label: "All Orders", href: "/admin/sales" },
      { label: "Invoices", href: "/admin/invoices" },
      { label: "Quotations", href: "/admin/quotation" },
    ],
  },
  {
    label: "Manage Stock",
    href: "/admin/manage-stock",
    icon: ListTodo,
  },
  {
    label: "Notes",
    href: "/admin/notes",
    icon: NotebookTabs,
  },
  {
    label: "Workflows",
    href: "/admin/workflows",
    icon: Workflow,
    children: [
      { label: "Automations", href: "/admin/automations" },
      { label: "Runs", href: "/admin/runs" },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("Dashboard");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-background">
      <AnimatedSidebarProvider className="min-h-screen border-none bg-background">
        <AnimatedSidebar
          ariaLabel="Rentora workspace"
          collapsible="icon"
          className="min-h-screen"
          panelClassName="h-full border-foreground/[0.08]"
        >
          <AnimatedSidebarHeader className="p-3 pb-2">
            <div className="flex min-h-11 items-center gap-3 overflow-hidden px-2">
              <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-foreground text-background font-bold text-xs">
                R
              </div>
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[state=collapsed]/sidebar:hidden"
              >
                <span className="truncate text-sm font-semibold text-foreground">
                  Rentora Inc
                </span>
                <ChevronsUpDown
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-muted-foreground"
                />
              </button>
              <AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-muted md:hidden">
                <X aria-hidden="true" className="size-4" />
              </AnimatedSidebarClose>
            </div>
          </AnimatedSidebarHeader>

          <AnimatedSidebarContent className="px-2 pt-1">
            <AnimatedSidebarGroup className="pb-2">
              <AnimatedSidebarGroupContent>
                <AnimatedSidebarMenu>
                  <AnimatedSidebarMenuItem>
                    <AnimatedSidebarMenuButton
                      icon={<Search className="size-4" />}
                      onSelect={() => setActive("Search")}
                    >
                      Search
                    </AnimatedSidebarMenuButton>
                  </AnimatedSidebarMenuItem>
                  <AnimatedSidebarMenuItem>
                    <AnimatedSidebarMenuButton
                      icon={<Sparkles className="size-4" />}
                      onSelect={() => setActive("AI Assistant")}
                    >
                      AI Assistant
                    </AnimatedSidebarMenuButton>
                  </AnimatedSidebarMenuItem>
                  <AnimatedSidebarMenuItem>
                    <AnimatedSidebarMenuButton
                      icon={<Inbox className="size-4" />}
                      badge="4"
                      onSelect={() => setActive("Inbox")}
                    >
                      Inbox
                    </AnimatedSidebarMenuButton>
                  </AnimatedSidebarMenuItem>
                </AnimatedSidebarMenu>
              </AnimatedSidebarGroupContent>
            </AnimatedSidebarGroup>

            <AnimatedSidebarGroup className="pt-1">
              <AnimatedSidebarGroupLabel>Workspaces</AnimatedSidebarGroupLabel>
              <AnimatedSidebarGroupContent>
                <AnimatedSidebarMenu>
                  {destinations.map(
                    ({ label, href, icon: Icon, children: subItems }) => {
                      const isParentActive =
                        pathname === href ||
                        subItems?.some((sub) => pathname === sub.href);

                      return (
                        <AnimatedSidebarMenuItem key={label}>
                          <Link href={href} className="w-full">
                            <AnimatedSidebarMenuButton
                              isActive={isParentActive || active === label}
                              ariaExpanded={
                                subItems ? openSection === label : undefined
                              }
                              icon={<Icon className="size-4" />}
                              onSelect={() => {
                                setOpenSection((current) => {
                                  if (!subItems) {
                                    setActive(label);
                                    return null;
                                  }
                                  return current === label ? null : label;
                                });
                              }}
                            >
                              {label}
                            </AnimatedSidebarMenuButton>
                          </Link>
                          {subItems ? (
                            <AnimatedSidebarMenuSub
                              open={Boolean(
                                openSection === label || isParentActive,
                              )}
                            >
                              {subItems.map((child) => (
                                <AnimatedSidebarMenuSubItem key={child.label}>
                                  <Link href={child.href} className="w-full">
                                    <AnimatedSidebarMenuSubButton
                                      isActive={pathname === child.href}
                                      onSelect={() => setActive(child.label)}
                                    >
                                      {child.label}
                                    </AnimatedSidebarMenuSubButton>
                                  </Link>
                                </AnimatedSidebarMenuSubItem>
                              ))}
                            </AnimatedSidebarMenuSub>
                          ) : null}
                        </AnimatedSidebarMenuItem>
                      );
                    },
                  )}
                </AnimatedSidebarMenu>
              </AnimatedSidebarGroupContent>
            </AnimatedSidebarGroup>
          </AnimatedSidebarContent>

          <AnimatedSidebarFooter className="gap-3 border-none p-3">
            <button
              type="button"
              className="flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-xl p-1 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d5ff66] text-xs font-semibold text-[#172000]">
                MW
              </span>
              <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
                <span className="block truncate text-sm font-medium text-foreground">
                  Mike Witzel
                </span>
                <span className="block truncate text-xs text-muted-foreground">
                  mike@rentora.com
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground group-data-[state=collapsed]/sidebar:hidden"
              />
            </button>
          </AnimatedSidebarFooter>

          <AnimatedSidebarRail />
        </AnimatedSidebar>

        <AnimatedSidebarInset className="min-h-screen bg-background flex flex-col justify-between">
          <header className="flex h-16 shrink-0 items-center gap-3 border-border border-b px-4">
            <AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <PanelLeft aria-hidden="true" className="size-4" />
            </AnimatedSidebarTrigger>
            <div className="h-5 w-px bg-border" />
            <p className="text-sm font-medium text-foreground">
              {destinations.find((d) => d.href === pathname)?.label ?? active}
            </p>
          </header>

          <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        </AnimatedSidebarInset>
      </AnimatedSidebarProvider>
    </div>
  );
}
