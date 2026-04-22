"use client";
import { useState } from "react";
import { Card, HStack, VStack, Text, Textarea } from "@chakra-ui/react";
import { ActionButton } from "./actionButton";
import { handleDeleteThought } from "@/lib/actions";
import { toaster } from "./toaster";
import { GoX } from "react-icons/go";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
  content: { id: number; content: string; createdAt: Date };
  onDelete?: (id: number) => void;
  deleteType?: "soft" | "hard";
};
export const ThoughtCard = ({
  content,
  onDelete,
  deleteType = "soft",
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content.content);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(content.createdAt));

  const deleteThought = async () => {
    onDelete?.(content.id);
    const result = await handleDeleteThought(content.id, deleteType);

    if (result?.success === false) {
      toaster.create({ type: "error", title: result.error });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setEditing(false);
    }
  };

  return (
    <Card.Root
      position="relative"
      className="group"
      transition="border-color 0.15s ease"
      variant="subtle"
      size="sm"
      bg="#ffffff"
      border={editing ? "1px solid #4D6055" : "1px solid #c2c8c254"}
      borderRadius={16}
      padding={4}
      onDoubleClick={() => setEditing(true)}
    >
      <VStack position="absolute" top="-11px" right="-11px" gap={2}>
        <ActionButton icon={<GoX />} onClick={deleteThought} />
        <ActionButton
          icon={<MdOutlineEdit />}
          onClick={() => setEditing(true)}
        />
      </VStack>
      <Card.Body display="flex" flexDirection="column" gap={2} px={6} py={3}>
        <HStack gap={2}>
          <Text
            fontSize="xs"
            color="#4d6055cf"
            fontWeight={500}
            textTransform="uppercase"
            letterSpacing="wide"
          >
            Thought
          </Text>
          <Text fontSize="xs" color="#4d6055b6">
            {formattedTime}
          </Text>
        </HStack>
        {editing ? (
          <Textarea
            autoresize
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setEditing(false)}
            autoFocus
            p={0}
            border="none"
            outline="none"
            resize="none"
            fontSize="lg"
            lineHeight="initial"
            fontWeight={500}
            color="black"
            variant="flushed"
            _focus={{ boxShadow: "none" }}
          />
        ) : (
          <Text
            fontWeight={500}
            color="black"
            fontSize="lg"
            lineHeight="initial"
          >
            {value}
          </Text>
        )}
      </Card.Body>
    </Card.Root>
  );
};
