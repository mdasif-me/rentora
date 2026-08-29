"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { RiArrowLeftLine, RiArrowRightLine, RiStarFill } from "@remixicon/react";
import { motion } from "motion/react";
import { TESTIMONIALS_DATA, TESTIMONIALS_HEADER } from "./constants";
import type { TestimonialsProps } from "./types";

export default function Testimonials({ className }: TestimonialsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <motion.section
      id="testimonials"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("py-20 lg:py-28 bg-zinc-50/50 overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground max-w-xl mx-auto leading-tight">
            {TESTIMONIALS_HEADER.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {TESTIMONIALS_HEADER.subtitle}
          </p>
        </div>

        <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
          <CarouselContent className="-ml-6">
            {TESTIMONIALS_DATA.map((item) => (
              <CarouselItem key={item.id} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="rounded-2xl bg-zinc-200/80 p-6 flex flex-col justify-between h-full min-h-[230px] border border-zinc-200/60 shadow-xs transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-300 shrink-0">
                        {item.avatar ? (
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover w-full h-full"
                          />
                        ) : null}
                      </div>

                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-foreground leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xs text-muted-foreground font-normal mt-0.5">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-sm font-semibold text-foreground">
                        {item.rating.toFixed(1)}
                      </span>
                      <RiStarFill className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4 font-medium">
                    {item.comment}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom Controls Row: Dots on Left, Navigation Arrows on Right */}
          <div className="mt-12 flex items-center justify-between pt-2">
            {/* Left Pagination Dot Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: count || TESTIMONIALS_DATA.length }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    current === index
                      ? "w-8 h-2.5 bg-foreground"
                      : "w-2.5 h-2.5 bg-zinc-300 hover:bg-zinc-400",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Navigation Arrow Buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="w-12 h-12 rounded-full border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white transition-colors shadow-xs"
                aria-label="Previous slide"
              >
                <RiArrowLeftLine className="w-5 h-5 shrink-0" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => api?.scrollNext()}
                className="w-12 h-12 rounded-full border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white transition-colors shadow-xs"
                aria-label="Next slide"
              >
                <RiArrowRightLine className="w-5 h-5 shrink-0" />
              </Button>
            </div>
          </div>
        </Carousel>
      </div>
    </motion.section>
  );
}
