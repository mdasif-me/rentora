/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { EASE_OUT, SPRING_PANEL } from "@/lib/ease";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  children: ReactNode;
  
  className?: string;
  
  backdropClassName?: string;
  ariaLabel?: string;
  
  dismissable?: boolean;
}

export function Drawer({
  open,
  onOpenChange,
  side = "right",
  children,
  className,
  backdropClassName,
  ariaLabel,
  dismissable = true,
}: DrawerProps) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onOpenChange]);

  if (!mounted) return null;

  const offscreen = side === "right" ? "100%" : "-100%";

  const drawerContent = (
    <AnimatePresence>
      {open && (
        <>
          {}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onClick={() => dismissable && onOpenChange(false)}
            className={cn(
              "fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm cursor-pointer",
              backdropClassName,
            )}
            aria-hidden="true"
          />

          {}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={reduce ? { opacity: 0 } : { x: offscreen }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: offscreen }}
            transition={
              reduce ? { duration: 0.25, ease: EASE_OUT } : SPRING_PANEL
            }
            className={cn(
              "fixed inset-y-0 z-10000 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl overflow-y-auto",
              side === "right"
                ? "right-0 border-l border-border"
                : "left-0 border-r border-border",
              className,
            )}
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}
