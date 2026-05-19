"use server";

import { appsignal } from "../appsignal.cjs";
import { logger } from "./logger";

import { revalidatePath } from "next/cache";
import {
  addThought,
  countThoughts,
  softDeleteThought,
  deleteThought,
} from "./thoughts";
import { addDailyEntry, softDeleteDailyEntry, deleteDailyEntry } from "./daily";

export async function handleAddThought(content: string) {
  if (!content.trim()) {
    return { success: false, error: "Content cannot be empty" };
  }

  if (content.length > 5000) {
    return { success: false, error: "Content is too long" };
  }
  try {
    await addThought(content);
    appsignal.metrics().incrementCounter("thoughts", 1);
    const total = await countThoughts();
    appsignal.metrics().setGauge("thoughts_total", total);
    revalidatePath("/");
  } catch (e) {
    logger.error("Failed to add thought", { error: String(e) });
    return { success: false, error: "Failed to add thought" };
  }
}

export async function handleAddDaily(content: string, occurredAt?: string) {
  if (!content.trim()) {
    return { success: false, error: "Content cannot be empty" };
  }

  if (content.length > 5000) {
    return { success: false, error: "Content is too long" };
  }
  try {
    const parsedOccurredAt = occurredAt ? new Date(occurredAt) : undefined;
    await addDailyEntry(content, parsedOccurredAt);
    revalidatePath("/daily");
  } catch (e) {
    logger.error("Failed to add daily entry", { error: String(e) });
    return { success: false, error: "Failed to add daily entry" };
  }
}

export async function handleDeleteDaily(
  id: number,
  deleteType: string = "soft",
) {
  if (!id || typeof id !== "number") {
    return { success: false, error: "Invalid ID" };
  }
  try {
    if (deleteType === "soft") {
      await softDeleteDailyEntry(id);
    } else if (deleteType === "hard") {
      await deleteDailyEntry(id);
    }
    revalidatePath("/daily");
  } catch (e) {
    logger.error("Failed to delete daily entry", { error: String(e) });
    return { success: false, error: "Failed to delete daily entry" };
  }
}

export async function handleDeleteThought(
  id: number,
  deleteType: string = "soft",
) {
  if (!id || typeof id !== "number") {
    return { success: false, error: "Invalid ID" };
  }
  try {
    if (deleteType === "soft") {
      await softDeleteThought(id);
    } else if (deleteType === "hard") {
      await deleteThought(id);
    }
    appsignal
      .metrics()
      .incrementCounter("thoughts_deleted", 1, { type: deleteType });
    revalidatePath("/");
  } catch (e) {
    logger.error("Failed to delete thought", { error: String(e) });
    return { success: false, error: "Failed to delete thought" };
  }
}
