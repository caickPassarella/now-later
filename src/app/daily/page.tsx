import { Suspense } from "react";
import { Container, Skeleton, Stack } from "@chakra-ui/react";
import { getDailyEntriesByDate } from "@/lib/daily";
import { DailyFeed } from "@/components/ui/dailyFeed";
import { DailyNav } from "@/components/ui/dailyNav";
import { logger } from "@/lib/logger";
import { appsignal } from "@/appsignal.cjs";

const DailyEntries = async ({ date }: { date: string }) => {
  const entries = await getDailyEntriesByDate(date).catch((e) => {
    logger.error("Failed to fetch daily entries", { error: String(e) });
    throw e;
  });

  return <DailyFeed key={date} entries={entries} date={date} />;
};

const Daily = async ({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) => {
  appsignal.metrics().incrementCounter("page_visits", 1, { page: "daily" });
  const { date: dateParam } = await searchParams;

  const todayStr = new Date().toLocaleDateString("en-CA");
  const isValidDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
  const date = dateParam && isValidDate(dateParam) ? dateParam : todayStr;

  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DailyNav date={date} />
        <Suspense
          key={date}
          fallback={
            <Stack gap={4}>
              <Skeleton height="8" />
              <Skeleton height="8" />
              <Skeleton height="8" />
            </Stack>
          }
        >
          <DailyEntries date={date} />
        </Suspense>
      </Stack>
    </Container>
  );
};

export default Daily;
