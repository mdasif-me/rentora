import type { RemixiconComponentType } from "@remixicon/react";

export interface HowItWorksStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: RemixiconComponentType;
}

export interface HowItWorksProps {
  readonly className?: string;
}
