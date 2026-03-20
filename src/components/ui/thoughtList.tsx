"use client";
import { Stack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThoughtCard } from "./thoughtCard";

type Thought = { id: number; content: string; createdAt: Date };

export const ThoughtList = ({ thoughts: initial }: { thoughts: Thought[] }) => {
  const [thoughts, setThoughts] = useState(initial);

  useEffect(() => {
    setThoughts(initial);
  }, [initial]);

  const remove = (id: number) =>
    setThoughts((prev) => prev.filter((t) => t.id !== id));

  return (
    <Stack gap={5}>
      <AnimatePresence>
        {thoughts.map((thought) => (
          <motion.div
            key={thought.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ThoughtCard content={thought} onDelete={remove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Stack>
  );
};
