import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import { logger } from "./logger";

export const getThoughts = unstable_cache(
  async () => {
    const thought = await prisma.thought.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    logger.info("Fetched thoughts", { count: thought.length });
    return thought;
  },
  ["thoughts"],
  { tags: ["thoughts"] },
);

export const getDeletedThoughts = unstable_cache(
  async () => {
    const thought = await prisma.thought.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { deletedAt: "desc" },
    });
    logger.info("Fetched deleted thoughts", { count: thought.length });
    return thought;
  },
  ["deleted-thoughts"],
  { tags: ["deleted"] },
);

export const countThoughts = async () => {
  return prisma.thought.count({ where: { deletedAt: null } });
};

export const addThought = async (content: string) => {
  const thought = await prisma.thought.create({
    data: {
      content,
    },
  });
  logger.info("Thought added", { id: thought.id });
  return thought;
};

export const softDeleteThought = async (id: number) => {
  const thought = await prisma.thought.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
  logger.info("Thought soft deleted", { id: thought.id });
  return thought;
};

export const deleteThought = async (id: number) => {
  const thought = await prisma.thought.delete({
    where: {
      id,
    },
  });
  logger.info("Thought permanently deleted", { id: thought.id });
  return thought;
};
