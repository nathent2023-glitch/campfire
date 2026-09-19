"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { Flame, Gamepad2, Plus, Wrench } from "lucide-react";
import { servers } from "@/lib/mock";
import { useChat } from "@/lib/store";
import { cn } from "@/lib/utils";

const serverIcons: Record<string, ReactNode> = {
  flame: <Flame size={20} />,
  tools: <Wrench size={20} />,
  games: <Gamepad2 size={20} />,
};

export function ServerRail() {
  const { activeServerId, selectServer } = useChat();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.children,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      data-testid="server-rail"
      className="flex w-[68px] flex-col items-center gap-2 overflow-y-auto bg-zinc-950 py-3 nice-scroll"
    >
      {servers.map((s) => {
        const active = s.id === activeServerId;
        return (
          <button
            key={s.id}
            title={s.name}
            onClick={() => selectServer(s.id)}
            className={cn(
              "group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-xl transition-all hover:rounded-xl hover:bg-orange-500",
              active && "rounded-xl bg-orange-500"
            )}
          >
            <span
              className={cn(
                "absolute -left-3 h-0 w-1 rounded-r bg-white transition-all",
                active ? "h-8" : "group-hover:h-5"
              )}
            />
            {serverIcons[s.icon]}
          </button>
        );
      })}
      <button
        title="Create server (wires to Supabase in v0.2.0)"
        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-500 transition-all hover:rounded-xl hover:border-emerald-500 hover:text-emerald-400"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
