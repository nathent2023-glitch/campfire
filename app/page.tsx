export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
      <main className="flex max-w-md flex-col items-center gap-4 px-8 text-center">
        <div className="text-5xl">🔥</div>
        <h1 className="text-3xl font-bold tracking-tight">Campfire</h1>
        <p className="text-sm leading-6 text-zinc-400">
          v0.0.0 bootstrap is live. Chat-first: servers, channels, and
          realtime messages land next.
        </p>
        <div className="flex gap-2 text-xs text-zinc-500">
          <span className="rounded-full border border-zinc-800 px-3 py-1">
            Next.js
          </span>
          <span className="rounded-full border border-zinc-800 px-3 py-1">
            Supabase
          </span>
          <span className="rounded-full border border-zinc-800 px-3 py-1">
            Vercel
          </span>
        </div>
      </main>
    </div>
  );
}
