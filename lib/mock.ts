export type Server = { id: string; name: string; icon: "flame" | "tools" | "games" };
export type Channel = {
  id: string;
  serverId: string;
  name: string;
  topic?: string;
  empty?: boolean;
};
export type Message = {
  id: string;
  channelId: string;
  author: string;
  color: string;
  time: string;
  content: string;
};
export type Member = {
  id: string;
  name: string;
  status: "online" | "idle" | "offline";
  role: string;
};

// ponytail: static mock data only, Supabase replaces this in v0.2.0
export const servers: Server[] = [
  { id: "camp", name: "Campfire", icon: "flame" },
  { id: "builders", name: "Builders", icon: "tools" },
  { id: "games", name: "Games", icon: "games" },
];

export const channels: Channel[] = [
  { id: "general", serverId: "camp", name: "general", topic: "Welcome to the fire" },
  { id: "ideas", serverId: "camp", name: "ideas", topic: "Pitch your wildest builds" },
  { id: "quiet", serverId: "camp", name: "quiet", topic: "An empty channel (empty state demo)", empty: true },
  { id: "help", serverId: "builders", name: "help", topic: "Ask anything" },
  { id: "showcase", serverId: "builders", name: "showcase", topic: "Show your work" },
  { id: "lobby", serverId: "games", name: "lobby", topic: "Find players" },
];

export const messages: Message[] = [
  { id: "m1", channelId: "general", author: "nathent", color: "text-orange-400", time: "14:02", content: "Welcome to Campfire — this is the v0.1.0 UI shell. No backend yet." },
  { id: "m2", channelId: "general", author: "maya", color: "text-violet-400", time: "14:03", content: "Love the layout. Feels like Discord but warmer." },
  { id: "m3", channelId: "general", author: "leo", color: "text-cyan-400", time: "14:05", content: "Can't wait for the code playground tab." },
  { id: "m4", channelId: "ideas", author: "maya", color: "text-violet-400", time: "13:40", content: "Idea: remix button on every shared project, like Scratch." },
  { id: "m5", channelId: "ideas", author: "nathent", color: "text-orange-400", time: "13:44", content: "Yes — feed + remix comes after chat is solid." },
  { id: "m6", channelId: "help", author: "leo", color: "text-cyan-400", time: "12:10", content: "How do I join a server? Click the server icons in the left rail." },
  { id: "m7", channelId: "showcase", author: "nathent", color: "text-orange-400", time: "11:58", content: "v0.1.0 shell screenshot goes here soon." },
  { id: "m8", channelId: "lobby", author: "maya", color: "text-violet-400", time: "10:20", content: "Anyone up for a game night test?" },
];

export const members: Member[] = [
  { id: "u1", name: "nathent", status: "online", role: "Owner" },
  { id: "u2", name: "maya", status: "online", role: "Builder" },
  { id: "u3", name: "leo", status: "idle", role: "Gamer" },
  { id: "u4", name: "ghost", status: "offline", role: "Lurker" },
];
