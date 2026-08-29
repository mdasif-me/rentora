export interface TestimonialItem {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly avatar?: string;
  readonly rating: number;
  readonly comment: string;
}

export interface TestimonialsProps {
  readonly className?: string;
}
