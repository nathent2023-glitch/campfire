"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Hash, MoonStar, Send } from "lucide-react";
import { channels, messages as seed } from "@/lib/mock";
import { useChat } from "@/lib/store";
import type { Message } from "@/lib/mock";

export function ChatPane() {
  const { activeChannelId } = useChat();
  const channel = channels.find((c) => c.id === activeChannelId);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [local, setLocal] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // fake fetch so skeleton + empty states are testable
  useEffect(() => {
    setLoading(true);
    setLocal([]);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [activeChannelId]);

  const base = useMemo(
    () => seed.filter((m) => m.channelId === activeChannelId),
    [activeChannelId]
  );
  const all = [...base, ...local];

  useEffect(() => {
    if (!listRef.current || loading) return;
    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: "power1.out" }
    );
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [activeChannelId, loading, local.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setLocal((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        channelId: activeChannelId,
        author: "guest",
        color: "text-orange-300",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: text,
      },
    ]);
    setDraft("");
  };

  return (
    <section
      data-testid="chat-pane"
      className="flex min-w-0 flex-1 flex-col bg-zinc-900/60"
    >
      <header className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Hash size={18} className="text-zinc-500" />
        <h3 className="truncate text-sm font-bold">{channel?.name}</h3>
        <span className="hidden truncate text-xs text-zinc-500 md:inline">
          {channel?.topic}
        </span>
      </header>

      <div
        ref={listRef}
        data-testid="message-list"
        className="flex-1 space-y-1 overflow-y-auto p-4 nice-scroll"
      >
        {loading ? (
          <div data-testid="chat-loading" className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="skeleton h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3 w-32 rounded" />
                  <div className="skeleton h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : all.length === 0 ? (
          <div
            data-testid="chat-empty"
            className="flex h-full flex-col items-center justify-center gap-2 text-center"
          >
            <MoonStar size={32} className="text-zinc-600" />
            <p className="font-semibold">No messages yet</p>
            <p className="max-w-xs text-sm text-zinc-500">
              Be the first to break the silence in #{channel?.name}.
            </p>
          </div>
        ) : (
          all.map((m) => (
            <div
              key={m.id}
              className="msg-in group flex gap-3 rounded-md px-2 py-1.5 hover:bg-zinc-800/60"
            >
              <div className="avatar-ring h-fit shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold">
                  {m.author[0]?.toUpperCase()}
                </div>
              </div>
              <div className="min-w-0">
                <p className="flex items-baseline gap-2">
                  <span className={`text-sm font-semibold ${m.color}`}>
                    {m.author}
                  </span>
                  <span className="text-[11px] text-zinc-500">{m.time}</span>
                </p>
                <p className="break-words text-sm text-zinc-200">{m.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-4 pb-1">
        <div className="flex items-center gap-1 text-xs text-zinc-500">
          <span className="flex gap-1">
            <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-zinc-400" />
          </span>
          <span className="ml-1">maya is typing… (mock)</span>
        </div>
      </div>

      <div className="p-4 pt-2">
        <div className="flex items-center gap-2 rounded-xl bg-zinc-800 p-2 transition-shadow focus-within:shadow-[0_0_0_2px_rgba(249,115,22,0.5)]">
          <input
            data-testid="composer"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            placeholder={`Message #${channel?.name}`}
            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-zinc-500"
          />
          <button
            data-testid="send-btn"
            onClick={send}
            aria-label="Send message"
            className="btn-glow flex h-9 w-9 items-center justify-center rounded-lg text-white"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="mt-1 text-[11px] text-zinc-600">
          Local mock send only — realtime via Supabase lands in v0.2.0.
        </p>
      </div>
    </section>
  );
}
