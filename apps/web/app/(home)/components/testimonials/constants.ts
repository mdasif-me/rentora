import type { TestimonialItem } from "./types";

export const TESTIMONIALS_HEADER = {
  title: "Trusted by Thousands of Happy Customer",
  subtitle:
    "A high-performing web-based car rental system for any rent-a-car company and website",
} as const;

export const TESTIMONIALS_DATA: readonly TestimonialItem[] = [
  {
    id: "test-1",
    name: "Viezh Robert",
    location: "Warsaw, Poland",
    rating: 4.5,
    avatar: "https://placehold.co/100x100/cbd5e1/475569.png?text=VR",
    comment:
      "“Wow... I am very happy to use this car rental service, it turned out to be more than my expectations and so far there have been no problems. Rentora is always the best”.",
  },
  {
    id: "test-2",
    name: "Yessica Christy",
    location: "Shanxi, China",
    rating: 4.5,
    avatar: "https://placehold.co/100x100/cbd5e1/475569.png?text=YC",
    comment:
      "“I like it because I like traveling far and still can use this car rental service seamlessly. Very smooth booking process and awesome car condition”.",
  },
  {
    id: "test-3",
    name: "Kim Young Jou",
    location: "Seoul, South Korea",
    rating: 4.5,
    avatar: "https://placehold.co/100x100/cbd5e1/475569.png?text=KYJ",
    comment:
      "“This is have been the best car rental platform I have ever used. Highly recommended for everyone looking for fast and reliable car rentals!”.",
  },
  {
    id: "test-4",
    name: "Alexander Wright",
    location: "London, UK",
    rating: 4.8,
    avatar: "https://placehold.co/100x100/cbd5e1/475569.png?text=AW",
    comment:
      "“Exceptional service! The vehicle was delivered clean, full tank, and right on schedule. Will definitely book again on my next trip to London”.",
  },
] as const;
