"use server";

import { logger } from "./logger";

import { revalidatePath } from "next/cache";
import { addThought, deleteThought } from "./thoughts";

export async function handleAddThought(content: string) {
  if (!content.trim()) {
    return { success: false, error: "Content cannot be empty" };
  }

  if (content.length > 5000) {
    return { success: false, error: "Content is too long" };
  }
  try {
    await addThought(content);
    revalidatePath("/");
  } catch (e) {
    logger.error("Failed to add thought", { error: String(e) });
    return { success: false, error: "Failed to add thought" };
  }
}

export async function handleDeleteThought(id: number) {
  if (!id || typeof id !== "number") {
    return { success: false, error: "Invalid ID" };
  }
  try {
    await deleteThought(id);
    revalidatePath("/");
  } catch (e) {
    logger.error("Failed to delete thought", { error: String(e) });
    return { success: false, error: "Failed to delete thought" };
  }
}
