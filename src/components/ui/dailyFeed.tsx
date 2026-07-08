"use client";

import { useState } from "react";
import { DailyInput } from "@/components/ui/dailyInput";
import { EntryList } from "@/components/ui/entryList";
import { handleAddDaily, handleDeleteDaily } from "@/lib/actions";
import { toaster } from "./toaster";
import type { Entry } from "@/lib/types";

type ListEntry = Entry & { _key?: number };
type DailyFeedProps = {
  entries: Entry[];
  date: string;
};

export const DailyFeed = ({ entries, date }: DailyFeedProps) => {
  const [list, setList] = useState<ListEntry[]>(entries);

  const handleAction = async (content: string, occurredAt: string) => {
    const tempId = Date.now();

    setList((prev) => [
      ...prev,
      {
        id: tempId,
        content,
        createdAt: new Date(),
        occurredAt: new Date(occurredAt),
        _key: tempId,
      },
    ]);

    const result = await handleAddDaily(content, occurredAt);

    if (!result || result.success === false) {
      setList((prev) => prev.filter((e) => e._key !== tempId));
      toaster.create({ type: "error", title: result?.error });
      return;
    }

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
      <DailyInput date={date} onAdd={handleAction} />
      <EntryList
        entries={list}
        groupBy="hour"
        deleteType="soft"
        deleteAction={handleDeleteDaily}
        label="Daily"
      />
    </>
  );
};
