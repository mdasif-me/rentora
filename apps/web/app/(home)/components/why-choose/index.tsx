"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import {
  BOTTOM_BANNER_IMAGES,
  MAIN_FEATURE_IMAGE,
  WHY_CHOOSE_FEATURES,
  WHY_CHOOSE_HEADER,
} from "./constants";
import type { WhyChooseProps } from "./types";

export default function WhyChoose({ className }: WhyChooseProps) {
  return (
    <motion.section
      id="why-choose"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("py-20 lg:py-28 bg-background overflow-hidden", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-foreground">
            {WHY_CHOOSE_HEADER.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {WHY_CHOOSE_HEADER.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[566px] h-[340px] sm:h-[440px] lg:h-[528px] overflow-hidden rounded-2xl bg-muted shadow-md">
              <Image
                src={MAIN_FEATURE_IMAGE.src}
                alt={MAIN_FEATURE_IMAGE.alt}
                width={MAIN_FEATURE_IMAGE.width}
                height={MAIN_FEATURE_IMAGE.height}
                unoptimized
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-6 flex flex-col space-y-8 lg:space-y-10">
            {WHY_CHOOSE_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-[52px] h-[52px] shrink-0 rounded-xl bg-zinc-200/80 flex items-center justify-center text-zinc-700 shadow-xs">
                    <Icon className="w-6 h-6 shrink-0" />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <h3 className="text-[22px] font-semibold leading-[150%] text-foreground tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[16px] font-normal leading-relaxed text-muted-foreground max-w-md">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pt-4">
          {BOTTOM_BANNER_IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] overflow-hidden rounded-[10px] bg-muted shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                unoptimized
                className="w-full h-full object-cover rounded-[10px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
