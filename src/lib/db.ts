import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// libsql embedded replicas keep a Hrana stream open to Turso. After a period
// of inactivity Turso closes the stream server-side, but the client doesn't
// notice and keeps reusing the dead stream id (see tursodatabase/libsql#2083).
// Disconnecting forces Prisma to create a fresh client/stream on the next call.
function isStaleStreamError(e: unknown): boolean {
  const message = e instanceof Error ? e.message : String(e);
  return /stream not found|stream has expired|STREAM_EXPIRED/i.test(message);
}

export async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (e) {
    if (!isStaleStreamError(e)) throw e;
    console.warn("Stale libsql stream detected, reconnecting and retrying");
    await prisma.$disconnect();
    return operation();
  }
}
