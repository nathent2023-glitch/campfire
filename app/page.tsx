import { ServerRail } from "@/components/ServerRail";
import { ChannelSidebar } from "@/components/ChannelSidebar";
import { ChatPane } from "@/components/ChatPane";
import { MemberList } from "@/components/MemberList";

export default function Home() {
  return (
    <div
      data-testid="app-shell"
      className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100"
    >
      <ServerRail />
      <ChannelSidebar />
      <ChatPane />
      <MemberList />
    </div>
  );
}
