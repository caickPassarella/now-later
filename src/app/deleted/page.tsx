import { Suspense } from "react";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
import { EntryList } from "@/components/ui/entryList";
import { DateTitle } from "@/components/ui/dateTitle";
import { getDeletedThoughts } from "@/lib/thoughts";
import { logger } from "@/lib/logger";
import { appsignal } from "@/appsignal.cjs";

const DeletedThoughts = async () => {
  const thoughts = await getDeletedThoughts().catch((e) => {
    logger.error("Failed to fetch deleted thoughts", { error: String(e) });
    throw e;
  });

  return <EntryList entries={thoughts} groupBy="deletedAt" deleteType="hard" />;
};

const Deleted = () => {
  appsignal.metrics().incrementCounter("page_visits", 1, { page: "deleted" });

  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DateTitle />
        <Suspense
          fallback={
            <Stack gap={4}>
              <Skeleton height="8" />
              <Skeleton height="8" />
              <Skeleton height="8" />
            </Stack>
          }
        >
          <DeletedThoughts />
        </Suspense>
      </Stack>
    </Container>
  );
};

export default Deleted;
