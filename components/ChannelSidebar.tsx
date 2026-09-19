"use client";

import { Flame, Hash, Volume2 } from "lucide-react";
import { channels, servers } from "@/lib/mock";
import { useChat } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ChannelSidebar() {
  const { activeServerId, activeChannelId, selectChannel } = useChat();
  const server = servers.find((s) => s.id === activeServerId);
  const list = channels.filter((c) => c.serverId === activeServerId);

  return (
    <aside
      data-testid="channel-sidebar"
      className="hidden w-60 flex-col bg-zinc-900 sm:flex"
    >
      <div className="border-b border-zinc-800 px-4 py-3">
        <h2 className="truncate text-sm font-bold">{server?.name}</h2>
        <p className="truncate text-xs text-zinc-500">v0.1.0 UI shell</p>
      </div>
      <div className="flex-1 space-y-0.5 overflow-y-auto p-2 nice-scroll">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Text channels
        </p>
        {list.map((c) => {
          const active = c.id === activeChannelId;
          return (
            <button
              key={c.id}
              onClick={() => selectChannel(c.id)}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100",
                active && "bg-zinc-800 text-white"
              )}
            >
              <Hash size={16} className="shrink-0 text-zinc-500" />
              <span className="truncate">{c.name}</span>
            </button>
          );
        })}
        <p className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Voice
        </p>
        <div className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-zinc-500">
          <Volume2 size={16} />
          <span className="truncate">lounge (v0.4+)</span>
        </div>
      </div>
      <div className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-2">
          <div className="avatar-ring">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-orange-400">
              <Flame size={16} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">guest</p>
            <p className="text-[11px] text-emerald-400">● online (mock)</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
