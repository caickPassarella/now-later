import { Container, Stack } from "@chakra-ui/react";
import { getThoughts } from "@/lib/thoughts";
import type { Thought } from "@/app/generated/prisma/client";
import { ThoughtCard } from "@/components/ui/thoughtCard";
import { InputSearch } from "@/components/ui/inputSearch";
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
        <InputSearch />
        <Stack gap={4}>
          {thoughts.map((thought) => (
            <ThoughtCard key={thought.id} content={thought} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
