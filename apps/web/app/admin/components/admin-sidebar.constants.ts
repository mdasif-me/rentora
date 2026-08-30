import {
  RiAddCircleLine,
  RiCarLine,
  RiDashboard3Line,
  RiFileList3Line,
  RiFoldersLine,
} from "@remixicon/react";
import type { AdminNavSection } from "./admin-sidebar.types";

export const ADMIN_NAV_SECTIONS: readonly AdminNavSection[] = [
  {
    id: "sec-workspaces",
    sectionTitle: "Workspaces",
    items: [
      {
        id: "nav-dashboard",
        label: "Dashboard",
        href: "/admin",
        icon: RiDashboard3Line,
      },
    ],
  },
  {
    id: "sec-vehicle",
    sectionTitle: "Vehicle",
    items: [
      {
        id: "nav-all-vehicles",
        label: "All Vehicles",
        href: "/admin/vehicles",
        icon: RiCarLine,
      },
      {
        id: "nav-create-vehicle",
        label: "Create Vehicle",
        href: "/admin/vehicles/create",
        icon: RiAddCircleLine,
      },
      {
        id: "nav-category",
        label: "Category",
        href: "/admin/categories",
        icon: RiFoldersLine,
      },
    ],
  },
  {
    id: "sec-lead",
    sectionTitle: "Lead",
    items: [
      {
        id: "nav-leads",
        label: "Leads",
        href: "/admin/leads",
        icon: RiFileList3Line,
      },
    ],
  },
] as const;
