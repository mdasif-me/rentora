import type { RemixiconComponentType } from "@remixicon/react";

export interface WhyChooseFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: RemixiconComponentType;
}

export interface WhyChooseProps {
  readonly className?: string;
}
