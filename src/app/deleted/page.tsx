import { Container, Stack } from "@chakra-ui/react";
import { ThoughtList } from "@/components/ui/thoughtList";
import { DateTitle } from "@/components/ui/dateTitle";
import { getDeletedThoughts } from "@/lib/thoughts";
import { logger } from "@/lib/logger";

const Deleted = async () => {
  const thoughts = await getDeletedThoughts().catch((e) => {
    logger.error("Failed to fetch deleted thoughts", { error: String(e) });
    throw e;
  });
  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DateTitle />
        <ThoughtList
          thoughts={thoughts}
          groupBy="deletedAt"
          deleteType="hard"
        />
      </Stack>
    </Container>
  );
};

export default Deleted;
