import type { RemixiconComponentType } from "@remixicon/react";

export interface AdminNavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon?: RemixiconComponentType;
  readonly badge?: string;
  readonly children?: readonly AdminNavItem[];
}

export interface AdminNavSection {
  readonly id: string;
  readonly sectionTitle: string;
  readonly items: readonly AdminNavItem[];
}
