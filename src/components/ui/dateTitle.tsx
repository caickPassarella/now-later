import { Heading, Text, Center, VStack } from "@chakra-ui/react";

export const DateTitle = () => {
  const date = new Date();
  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(date);
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(date)
    .toUpperCase();
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    date,
  );
  const weekdayYear = `${weekday} · ${year}`;
  return (
    <Center gap={2}>
      <VStack>
        <Heading size="6xl" fontWeight={400} color="#73877B">
          {monthDay}
        </Heading>
        <Text color="#737874" letterSpacing="2.8px">
          {weekdayYear}
        </Text>
      </VStack>
    </Center>
  );
};
