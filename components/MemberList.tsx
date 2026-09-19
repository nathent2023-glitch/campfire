"use client";

import { members } from "@/lib/mock";
import { cn } from "@/lib/utils";

const dot: Record<string, string> = {
  online: "bg-emerald-400",
  idle: "bg-amber-400",
  offline: "bg-zinc-600",
};

export function MemberList() {
  return (
    <aside
      data-testid="member-list"
      className="hidden w-52 flex-col bg-zinc-900 lg:flex"
    >
      <div className="flex-1 space-y-0.5 overflow-y-auto p-3 nice-scroll">
        <p className="px-1 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Members — {members.length}
        </p>
        {members.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-zinc-800"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold">
              {m.name[0]?.toUpperCase()}
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-900",
                  dot[m.status]
                )}
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm">{m.name}</span>
              <span className="block truncate text-[11px] text-zinc-500">
                {m.role}
              </span>
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
