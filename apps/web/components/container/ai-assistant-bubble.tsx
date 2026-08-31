"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@rentora/types";
import {
  ArrowRight,
  Car,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

interface DragScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

function DragScrollContainer({
  children,
  className,
}: DragScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    setIsDown(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={cn(
        "cursor-grab active:cursor-grabbing select-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  vehicles?: Vehicle[];
  timestamp: Date;
}

export default function AiAssistantBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I'm your Rentora AI Finder. 🚗✨ Describe what kind of car you want (e.g., 'A manual sports car under $100 in Dhaka' or 'A comfortable 6-seater SUV') and I'll find it for you!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${API}/ai/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!res.ok) throw new Error("Recommendation failed");
      const json = await res.json();
      const data = json.data || json;

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.explanation || "Here are the vehicles I found for you:",
        vehicles: Array.isArray(data.vehicles) ? data.vehicles : [],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: "I'm sorry, I encountered an issue connecting to the recommendation engine. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const chatVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 30, originX: 1, originY: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: 30,
      transition: {
        duration: 0.15,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[380px] max-w-[calc(100vw-2rem)] h-[520px] rounded-2xl border border-zinc-200/80 bg-white shadow-2xl flex flex-col overflow-hidden mb-4 origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-4.5 w-4.5 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">
                    AI Smart Assistant
                  </h3>
                  <p className="text-[10px] text-orange-100 font-medium">
                    Ask for recommendations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%] space-y-1",
                    msg.sender === "user"
                      ? "ml-auto items-end"
                      : "mr-auto items-start",
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.sender === "user"
                        ? "bg-orange-600 text-white rounded-tr-none"
                        : "bg-white text-zinc-800 border border-zinc-200/60 rounded-tl-none font-medium",
                    )}
                  >
                    {msg.text}
                  </div>

                  {/* mini-cards if bot recommends vehicles */}
                  {msg.vehicles && msg.vehicles.length > 0 && (
                    <DragScrollContainer className="w-full flex gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none max-w-[340px]">
                      {msg.vehicles.map((car) => (
                        <div
                          key={car.id}
                          className="shrink-0 w-[150px] bg-white rounded-xl border border-zinc-200/80 p-2.5 flex flex-col justify-between shadow-sm"
                        >
                          {car.image ? (
                            <div className="h-16 w-full relative rounded-lg overflow-hidden bg-zinc-50 mb-2">
                              <Image
                                src={car.image}
                                alt={car.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-16 w-full rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-2">
                              <Car className="h-6 w-6 text-zinc-400" />
                            </div>
                          )}
                          <div className="mb-2">
                            <h4 className="text-xs font-bold text-zinc-900 truncate">
                              {car.name}
                            </h4>
                            <p className="text-[10px] text-zinc-500 capitalize">
                              {car.type} • {car.category?.name || "Standard"}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                            <span className="text-[11px] font-extrabold text-zinc-950">
                              ${car.pricePerDay}
                              <span className="text-[9px] text-zinc-500 font-medium">
                                /d
                              </span>
                            </span>
                            <Link
                              href={`/search?location=${encodeURIComponent(car.location)}`}
                              className="text-[10px] font-bold text-orange-600 flex items-center hover:text-orange-700"
                            >
                              Rent
                              <ArrowRight className="h-2.5 w-2.5 ml-0.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </DragScrollContainer>
                  )}
                  <span className="text-[9px] text-zinc-400 px-1 font-medium">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-1 bg-white border border-zinc-200/60 p-2.5 rounded-2xl rounded-tl-none text-xs text-zinc-500 font-medium shadow-sm w-max mr-auto">
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-zinc-100 bg-zinc-50/50 flex flex-col gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                  Suggestions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "SUV for 6 passengers",
                    "Sports car in Dhaka under $100",
                    "Luxury automatic sedan",
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePromptClick(p)}
                      className="text-[10px] bg-white border border-zinc-200 text-zinc-700 font-medium rounded-full px-2.5 py-1 hover:text-orange-600 hover:border-orange-200 transition-all text-left"
                    >
                      &ldquo;{p}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Input */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-zinc-200/80 flex items-center gap-2 bg-white"
            >
              <input
                required
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your perfect car..."
                className="flex-1 h-10 px-3 rounded-xl border border-zinc-200 text-xs placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 shadow-inner"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !inputValue.trim()}
                className="h-10 w-10 shrink-0 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-md flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform duration-200 transform rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-white group-hover:scale-90 transition-transform duration-200" />
            <Sparkles className="h-3 w-3 text-[#d5ff66] absolute -top-1.5 -right-1.5 animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}
