# now-later

A personal memory aid app. Built to help with focus and memory — quickly log anything worth remembering, then look it up later by browsing or searching.

## Features

- **Thoughts** — log anything on your mind as it happens; searchable so you can look back at what you were thinking on any given day
- **Daily** — log activities as you do them throughout the day; browse past days with forward/back navigation
- **Trash** — soft-deleted entries are kept and can be permanently removed from the deleted page
- Persistent storage via SQLite + Prisma
- Monitoring via AppSignal

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Chakra UI](https://chakra-ui.com/) v3
- [Prisma](https://www.prisma.io/) 7 with SQLite (better-sqlite3)
- [AppSignal](https://www.appsignal.com/) for error tracking and metrics

## Getting started

**1. Install dependencies**

```bash
pnpm install
```

**2. Set up environment variables**

Copy `.env.example` to `.env` and fill in the required values (database path, AppSignal push API key).

**3. Run database migrations**

```bash
pnpm prisma migrate dev
```

**4. Start the dev server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

The schema lives in [src/prisma/schema.prisma](src/prisma/schema.prisma). To regenerate the Prisma client after schema changes:

```bash
pnpm prisma generate
```
