"use client";
import { Separator, HStack, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThoughtCard } from "./thoughtCard";

type Thought = {
  id: number;
  content: string;
  createdAt: Date;
  deletedAt?: Date | null;
  occurredAt?: Date | null;
};

type DeleteAction = (
  id: number,
  deleteType?: string,
) => Promise<{ success: boolean; error?: string } | undefined>;

export const ThoughtList = ({
  thoughts: initial,
  groupBy = "createdAt",
  deleteType = "soft",
  deleteAction,
  label,
}: {
  thoughts: Thought[];
  groupBy?: "createdAt" | "deletedAt" | "hour";
  deleteType?: "soft" | "hard";
  deleteAction?: DeleteAction;
  label?: string;
}) => {
  const [thoughts, setThoughts] = useState(initial);

  useEffect(() => {
    setThoughts(initial);
  }, [initial]);

  const remove = (id: number) =>
    setThoughts((prev) => prev.filter((t) => t.id !== id));

  const grouped = thoughts.reduce(
    (acc, t) => {
      let key: string;
      if (groupBy === "hour") {
        const dateToUse = t.occurredAt ?? t.createdAt;
        key = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          hour12: true,
        }).format(new Date(dateToUse));
      } else {
        const date = t[groupBy] ?? t.createdAt;
        key = new Date(date).toDateString();
      }
      (acc[key] ??= []).push(t);
      return acc;
    },
    {} as Record<string, Thought[]>,
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
            {group.map((thought) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <ThoughtCard content={thought} onDelete={remove} deleteType={deleteType} deleteAction={deleteAction} label={label} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      ))}
    </Stack>
  );
};
