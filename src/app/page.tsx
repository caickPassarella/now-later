import { Suspense } from "react";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
import { getThoughts } from "@/lib/thoughts";
import { DateTitle } from "@/components/ui/dateTitle";
import { ThoughtFeed } from "@/components/ui/thoughtFeed";
import { logger } from "@/lib/logger";
import { appsignal } from "@/appsignal.cjs";

const Thoughts = async () => {
  const thoughts = await getThoughts().catch((e) => {
    logger.error("Failed to fetch thoughts", { error: String(e) });
    throw e;
  });

  return <ThoughtFeed entries={thoughts} />;
};

const Home = () => {
  appsignal.metrics().incrementCounter("page_visits", 1, { page: "thoughts" });

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
          <Thoughts />
        </Suspense>
      </Stack>
    </Container>
  );
};

export default Home;
