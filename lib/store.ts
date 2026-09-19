"use client";

import { create } from "zustand";
import { channels, servers } from "./mock";

type ChatState = {
  activeServerId: string;
  activeChannelId: string;
  selectServer: (id: string) => void;
  selectChannel: (id: string) => void;
};

export const useChat = create<ChatState>((set) => ({
  activeServerId: servers[0].id,
  activeChannelId: channels[0].id,
  selectServer: (id) => {
    const first = channels.find((c) => c.serverId === id);
    set({ activeServerId: id, activeChannelId: first?.id });
  },
  selectChannel: (id) => set({ activeChannelId: id }),
}));
