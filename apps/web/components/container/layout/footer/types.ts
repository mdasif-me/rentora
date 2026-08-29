import type { RemixiconComponentType } from "@remixicon/react";

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLinkGroup {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: RemixiconComponentType;
}

export interface FooterProps {
  readonly className?: string;
}
