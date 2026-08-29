"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { HOW_IT_WORKS_HEADER, HOW_IT_WORKS_STEPS } from "./constants";
import type { HowItWorksProps } from "./types";

export default function HowItWorks({ className }: HowItWorksProps) {
  return (
    <motion.section
      id="how-it-works"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("py-20 lg:py-28 bg-background overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground">
            {HOW_IT_WORKS_HEADER.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {HOW_IT_WORKS_HEADER.subtitle}
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-8 place-items-center md:items-start">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={cn(
                  "relative flex flex-col items-center justify-center text-center mx-auto max-w-xs sm:max-w-sm w-full group",
                  index === 2 && "sm:col-span-2 md:col-span-1",
                )}
              >
                {/* Curved SVG Connector Line for Desktop / Tablet */}
                {index < HOW_IT_WORKS_STEPS.length - 1 ? (
                  <div className="hidden md:block absolute left-[64%] top-3 w-[80%] z-0 pointer-events-none">
                    <svg
                      width="100%"
                      height="85"
                      viewBox="0 0 356 85"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto text-zinc-800"
                    >
                      <path
                        d="M354.609 5.5509C354.882 5.5901 355.135 5.40029 355.174 5.12695C355.214 4.8536 355.024 4.60023 354.75 4.56103L354.68 5.05596L354.609 5.5509ZM0.0862427 79.5255L-3.75509e-06 80.018C42.0694 87.3851 71.9905 84.4979 96.5411 76.4767C121.075 68.4612 140.218 55.3238 160.694 42.2776C181.18 29.2256 203.035 16.2378 233.07 8.41158C263.104 0.58524 301.351 -2.08723 354.609 5.5509L354.68 5.05596L354.75 4.56103C301.392 -3.09157 263.008 -0.42297 232.817 7.44389C202.627 15.3108 180.664 28.3684 160.157 41.4342C139.64 54.5058 120.617 67.5587 96.2305 75.5262C71.8613 83.4881 42.1092 86.3768 0.172489 79.033L0.0862427 79.5255Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ) : null}

                {/* Step Icon Container */}
                <div className="relative z-10 flex items-center justify-center w-24 h-24 rounded-3xl bg-muted text-muted-foreground/70 shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105 group-hover:bg-muted-foreground/70 group-hover:text-white">
                  <Icon className="w-10 h-10 shrink-0" />
                </div>

                {/* Step Details */}
                <h3 className="mt-8 text-xl font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
