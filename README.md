# Campfire

Discord-like servers + Scratch-like creation, starting with chat.

## Notice — All Rights Reserved

This repository is **public for visibility only**.

No license is granted. You may not use, copy, modify, merge, publish,
distribute, sublicense, or sell any part of this project without prior
written permission from the owner.

## Stack (free tier)

- Frontend: Next.js (Vercel)
- Data/Auth/Realtime/Storage: Supabase
- API proxy for secrets/MCP: Render (Hono, minimal)

## Dev

```bash
npm install
npm run dev
```

Env (` .env.local`, never commit):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Releases

Shipped as GitHub Releases: `v0.0.0-bootstrap` → chat → playground → MCP.
