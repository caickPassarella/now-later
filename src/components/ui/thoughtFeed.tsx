"use client";

import { InputSearch } from "@/components/ui/inputSearch";
import { EntryList } from "@/components/ui/entryList";
import { toaster } from "./toaster";
import { handleAddThought } from "@/lib/actions";
import { useState } from "react";
import type { Entry } from "@/lib/types";

type ListEntry = Entry & { _key?: number };
type ThoughtFeedProps = {
  entries: Entry[];
};

export const ThoughtFeed = ({ entries }: ThoughtFeedProps) => {
  const [list, setList] = useState<ListEntry[]>(entries);

  const handleAction = async (content: string) => {
    const tempId = Date.now();

    setList((prev) => [
      { id: tempId, content, createdAt: new Date(), _key: tempId },
      ...prev,
    ]);

    const result = await handleAddThought(content);

    if (!result.success) {
      setList((prev) => prev.filter((e) => e._key !== tempId));
      toaster.create({ type: "error", title: result.error });
      return;
    }

    // Swap to real entry but preserve _key so framer-motion doesn't re-animate
    if (result.entry) {
      setList((prev) =>
        prev.map((e) =>
          e._key === tempId ? { ...result.entry!, _key: tempId } : e,
        ),
      );
    }
  };

  return (
    <>
      <InputSearch action={handleAction} />
      <EntryList entries={list} />
    </>
  );
};
