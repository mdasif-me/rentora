import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface AuthAction {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly variant: VariantProps<typeof buttonVariants>["variant"];
  readonly size?: VariantProps<typeof buttonVariants>["size"];
}

export interface NavigationProps {
  readonly className?: string;
}
