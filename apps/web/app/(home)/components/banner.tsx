"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Image from "next/image";

export default function Banner() {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-muted min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-center pt-6 lg:pt-20 pb-20 sm:pb-28 lg:pb-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:col-span-6 flex flex-col items-start text-left space-y-6 z-10 mt-6 lg:mt-0"
          >
            <span className="text-[14px] font-medium leading-[121%] text-foreground/80">
              100% Trusted Car rental platform in the UK
            </span>

            <h1 className="text-[36px] sm:text-[42px] lg:text-[46px] font-extrabold uppercase leading-[121%] tracking-tight text-foreground max-w-lg">
              FAST AND EASY WAY TO RENT A CAR
            </h1>

            <p className="text-[16px] font-medium leading-[160%] tracking-[-0.02em] text-muted-foreground max-w-lg">
              Our Car Rental online booking system designed to meet the specific
              needs of car rental business owners. This easy-to-use car rental
              software will let you manage.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Button
                variant="default"
                size="lg"
                className="px-6 py-3 text-base font-medium"
              >
                Booking Now
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-base font-medium hover:bg-transparent"
              >
                See all cars
              </Button>
            </div>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:col-span-6 lg:absolute lg:right-0 lg:top-12 sm:lg:top-16 lg:top-20 lg:bottom-0 lg:w-[50vw] xl:w-[48vw] flex justify-end"
          >
            <div className="relative w-full h-[320px] sm:h-[450px] lg:h-full lg:min-h-[680px] overflow-hidden rounded-2xl lg:rounded-none lg:rounded-tl-[63px] bg-muted shadow-xl">
              <Image
                src="https://placehold.co/729x680/94a3b8/ffffff/png"
                alt="Fast And Easy Way To Rent A Car"
                width={729}
                height={680}
                className="w-full h-full object-cover lg:rounded-tl-[63px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
