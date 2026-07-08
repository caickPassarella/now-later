import { prisma } from "./db";
import { logger } from "./logger";

export const getDailyEntries = async () => {
  const entries = await prisma.daily.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  logger.info("Fetched daily entries", { count: entries.length });
  return entries;
};

export const getDailyEntriesByDate = async (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, d, 0, 0, 0, 0);
  const end = new Date(y, m - 1, d, 23, 59, 59, 999);
  const entries = await prisma.daily.findMany({
    where: { deletedAt: null, occurredAt: { gte: start, lte: end } },
    orderBy: { occurredAt: "asc" },
  });
  logger.info("Fetched daily entries by date", { date: dateStr, count: entries.length });
  return entries;
};

export const addDailyEntry = async (content: string, occurredAt?: Date) => {
  const entry = await prisma.daily.create({
    data: { content, ...(occurredAt && { occurredAt }) },
  });
  logger.info("Daily entry added", { id: entry.id });
  return entry;
};

export const softDeleteDailyEntry = async (id: number) => {
  const entry = await prisma.daily.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
  logger.info("Daily entry soft deleted", { id: entry.id });
  return entry;
};

export const deleteDailyEntry = async (id: number) => {
  const entry = await prisma.daily.delete({ where: { id } });
  logger.info("Daily entry permanently deleted", { id: entry.id });
  return entry;
};
