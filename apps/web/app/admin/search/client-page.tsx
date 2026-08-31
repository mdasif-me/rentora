"use client";

import { cn } from "@/lib/utils";
import { Bot, Sparkles, User, SendHorizonal, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "How many leads are pending today?",
  "What are our weekly earnings?",
  "Show me the fleet availability",
  "Give me a summary of rejected leads",
  "How many Tesla vehicles are rented?",
];

export function AdminSearchClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am your Rentora AI Assistant. You can ask me anything about your business, leads, revenue, or fleet status. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/ai/admin-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text.trim() }),
      });
      const json = await res.json();
      const answer =
        json?.data?.answer ??
        json?.answer ??
        "Sorry, I couldn't get an answer right now.";
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Connection error. Please check your network or if the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full max-w-4xl mx-auto rounded-3xl bg-background border border-border shadow-sm overflow-hidden relative">
      
      {}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 z-10 scrollbar-none">
        {}
        {messages.length === 1 && (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <Bot className="h-8 w-8 relative z-10" />
            </div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center justify-center gap-2">
              Rentora AI
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3 mr-1" /> Beta
              </span>
            </h1>
            <p className="text-muted-foreground font-medium mt-2 max-w-md">
              Ask questions in natural language to instantly search and analyze your rental data.
            </p>
          </div>
        )}

        {}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex max-w-[90%] sm:max-w-[80%] gap-4",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {}
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm mt-1 border",
                  msg.role === "user"
                    ? "bg-foreground text-background border-foreground"
                    : "bg-primary text-primary-foreground border-primary"
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>

              {}
              <div
                className={cn(
                  "rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-foreground text-background rounded-tr-sm"
                    : "bg-card text-card-foreground border border-border rounded-tl-sm"
                )}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {}
        {loading && (
          <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex max-w-[80%] gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm mt-1 border border-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-5 py-4 flex items-center gap-3 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground font-medium animate-pulse">
                  Analyzing your data...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {}
      <div className="shrink-0 bg-background/80 backdrop-blur-xl border-t border-border p-4 z-20">
        <div className="max-w-3xl mx-auto">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs font-semibold bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-4 py-2 rounded-full transition-colors border border-border hover:border-primary/30"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-end gap-2 bg-card border border-border rounded-3xl p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask anything about your business..."
              className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none border-0 px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 scrollbar-none"
              rows={1}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="h-11 w-11 flex shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40 transition-colors"
            >
              <SendHorizonal className="h-5 w-5 ml-0.5" />
            </button>
          </div>
          <div className="text-center mt-3">
            <p className="text-[11px] text-muted-foreground font-medium">
              AI can make mistakes. Please verify critical metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
