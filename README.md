# now-later

A personal memory aid app. Built to help with focus and memory — quickly log anything worth remembering, then look it up later by browsing or searching.

## Features

- **Thoughts** — log anything on your mind that you'd like to remember later; searchable so you can look back at what you were thinking on any given day
- **Daily** — log activities as you do them throughout the day; browse past days with forward/back navigation
- **Trash** — soft-deleted entries are kept and can be permanently removed from the deleted page
- Persistent storage via Turso (remote SQLite) + Prisma
- Monitoring via AppSignal

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Chakra UI](https://chakra-ui.com/) v3
- [Prisma](https://www.prisma.io/) 7 with [Turso](https://turso.tech/) (LibSQL)
- [AppSignal](https://www.appsignal.com/) for error tracking and metrics

## Getting started

**1. Install dependencies**

```bash
npm install
```

**2. Set up environment variables**

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

You can find your Turso database URL in the [Turso dashboard](https://app.turso.tech) or via the CLI — run `turso auth login` first if on a new device, then `turso db show now-later`. To generate a token: `turso db tokens create now-later`.

**3. Generate the Prisma client**

```bash
npx prisma generate
```

This generates the TypeScript client from the schema. Required before the app will compile.

**4. Apply database migrations**

```bash
npx prisma migrate deploy
```

This applies any pending migrations (including indexes) to your Turso database.

**5. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database

The schema lives in [src/prisma/schema.prisma](src/prisma/schema.prisma). To regenerate the Prisma client after schema changes:

```bash
npx prisma generate
```
