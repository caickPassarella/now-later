import { Card, Heading, Text } from "@chakra-ui/react";
import { ActionButton } from "./actionButton";

type Props = {
  content: { id: number; content: string; createdAt: Date };
  onDelete?: (id: number) => void;
};
export const ThoughtCard = ({ content, onDelete }: Props) => {
  return (
    <Card.Root
      position="relative"
      className="group"
      transition="border-color 0.15s ease"
      _hover={{ borderColor: "whiteAlpha.400" }}
      variant="subtle"
      size="sm"
      bg="whiteAlpha.100"
      border="1px solid"
      borderColor="whiteAlpha.200"
    >
      <ActionButton id={content.id} onDelete={onDelete} />
      <Card.Header>
        <Heading fontWeight={400} color="white" size="md">
          {content.content}
        </Heading>
      </Card.Header>

      <Card.Body color="white">
        <Text fontSize="sm">Thought</Text>
      </Card.Body>
    </Card.Root>
  );
};
