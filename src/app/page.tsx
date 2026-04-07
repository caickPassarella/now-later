import { Container, Stack } from "@chakra-ui/react";
import { getThoughts } from "@/lib/thoughts";
import type { Thought } from "@/app/generated/prisma/client";
import { ThoughtList } from "@/components/ui/thoughtList";
import { InputSearch } from "@/components/ui/inputSearch";
import { DateTitle } from "@/components/ui/dateTitle";
import { logger } from "@/lib/logger";

const Home = async () => {
  let thoughts: Thought[] = [];
  try {
    thoughts = await getThoughts();
  } catch (e) {
    logger.error("Failed to fetch thoughts", { error: String(e) });
    throw e;
  }
  return (
    <Container maxW="container.lg" py={10}>
      <Stack gap={8}>
        <DateTitle />
        <InputSearch />
        <ThoughtList thoughts={thoughts} />
      </Stack>
    </Container>
  );
};

export default Home;
