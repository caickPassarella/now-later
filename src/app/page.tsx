import { Container, Stack } from "@chakra-ui/react";
import { getThoughts } from "@/lib/thoughts";
import { EntryList } from "@/components/ui/entryList";
import { InputSearch } from "@/components/ui/inputSearch";
import { DateTitle } from "@/components/ui/dateTitle";
import { logger } from "@/lib/logger";
import { appsignal } from "@/appsignal.cjs";

const Home = async () => {
  appsignal.metrics().incrementCounter("page_visits", 1, { page: "thoughts" });
  const thoughts = await getThoughts().catch((e) => {
    logger.error("Failed to fetch thoughts", { error: String(e) });
    throw e;
  });
  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DateTitle />
        <InputSearch />
        <EntryList entries={thoughts} deleteType="soft" />
      </Stack>
    </Container>
  );
};

export default Home;
