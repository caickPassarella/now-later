import { Container, Stack } from "@chakra-ui/react";
import { EntryList } from "@/components/ui/entryList";
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
        <EntryList
          entries={thoughts}
          groupBy="deletedAt"
          deleteType="hard"
        />
      </Stack>
    </Container>
  );
};

export default Deleted;
