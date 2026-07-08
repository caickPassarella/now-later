"use client";
import { Separator, HStack, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EntryCard } from "./entryCard";
import type { DeleteAction, Entry } from "@/lib/types";

export const EntryList = ({
  entries: initial,
  groupBy = "createdAt",
  deleteType = "soft",
  deleteAction,
  label,
}: {
  entries: Entry[];
  groupBy?: "createdAt" | "deletedAt" | "hour";
  deleteType?: "soft" | "hard";
  deleteAction?: DeleteAction;
  label?: string;
}) => {
  const [removeIds, setRemoveIds] = useState<Set<number>>(new Set());

  const remove = (id: number) => setRemoveIds((prev) => new Set([...prev, id]));
  const filteredEntries = initial.filter((entry) => !removeIds.has(entry.id));

  const grouped = filteredEntries.reduce(
    (acc, e) => {
      let key: string;
      if (groupBy === "hour") {
        const dateToUse = e.occurredAt ?? e.createdAt;
        key = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          hour12: true,
        }).format(new Date(dateToUse));
      } else {
        const date = e[groupBy] ?? e.createdAt;
        key = new Date(date).toDateString();
      }
      (acc[key] ??= []).push(e);
      return acc;
    },
    {} as Record<string, Entry[]>,
  );

  return (
    <Stack gap={6}>
      {Object.entries(grouped).map(([date, group]) => (
        <Stack key={date} gap={4}>
          <HStack gap={3}>
            <Text
              fontSize="xs"
              color="#4d6055cf"
              fontWeight={500}
              whiteSpace="nowrap"
            >
              {date}
            </Text>
            <Separator flex={1} borderColor="#c2c8c254" />
          </HStack>
          <AnimatePresence>
            {group.map((entry) => (
              <motion.div
                key={entry._key ?? entry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <EntryCard
                  content={entry}
                  onDelete={remove}
                  deleteType={deleteType}
                  deleteAction={deleteAction}
                  label={label}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      ))}
    </Stack>
  );
};
