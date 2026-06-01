import { Container, Stack } from "@chakra-ui/react";
import { getDailyEntriesByDate } from "@/lib/daily";
import { EntryList } from "@/components/ui/entryList";
import { DailyInput } from "@/components/ui/dailyInput";
import { DailyNav } from "@/components/ui/dailyNav";
import { handleDeleteDaily } from "@/lib/actions";
import { logger } from "@/lib/logger";
import { appsignal } from "@/appsignal.cjs";

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

  const entries = await getDailyEntriesByDate(date).catch((e) => {
    logger.error("Failed to fetch daily entries", { error: String(e) });
    throw e;
  });

  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DailyNav date={date} />
        <DailyInput date={date} />
        <EntryList
          entries={entries}
          groupBy="hour"
          deleteType="soft"
          deleteAction={handleDeleteDaily}
          label="Daily"
        />
      </Stack>
    </Container>
  );
};

export default Daily;
