import { Card, HStack, Text } from "@chakra-ui/react";
import { ActionButton } from "./actionButton";
import { handleDeleteThought } from "@/lib/actions";
import { toaster } from "./toaster";
import { GoX } from "react-icons/go";

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

  return (
    <Card.Root
      position="relative"
      className="group"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: "whiteAlpha.400" }}
      variant="subtle"
      size="sm"
      bg="#ffffff"
      border="1px solid"
      borderColor="#c2c8c254"
      borderRadius={16}
      padding={4}
    >
      <ActionButton icon={<GoX />} onClick={deleteThought} />
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
        <Text fontWeight={500} color="black" fontSize="lg" lineHeight="snug">
          {content.content}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};
