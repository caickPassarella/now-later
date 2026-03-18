import { prisma } from "./db";
import { logger } from "./logger";

export const getThoughts = async () => {
  const thought = await prisma.thought.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  logger.info("Fetched thoughts", { count: thought.length });
  return thought;
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

export const deleteThought = async (id: number) => {
  const thought = await prisma.thought.delete({
    where: {
      id,
    },
  });
  logger.info("Thought deleted", { id: thought.id });
  return thought;
};
