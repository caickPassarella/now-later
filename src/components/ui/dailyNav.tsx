"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Heading,
  Text,
  Center,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export const DailyNav = ({ date }: { date: string }) => {
  const router = useRouter();

  const current = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [date]);

  const todayStr = new Date().toLocaleDateString("en-CA");
  const isToday = date === todayStr;

  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(current);
  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" })
    .format(current)
    .toUpperCase();
  const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    current,
  );

  const navigate = (offset: number) => {
    const next = new Date(current);
    next.setDate(next.getDate() + offset);
    router.push(`/daily?date=${next.toLocaleDateString("en-CA")}`);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const offset = e.key === "ArrowLeft" ? -1 : 1;
      if (offset === 1 && isToday) return;
      const next = new Date(current);
      next.setDate(next.getDate() + offset);
      router.push(`/daily?date=${next.toLocaleDateString("en-CA")}`);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [date, isToday, current, router]);

  return (
    <Center>
      <HStack gap={6} align="center">
        <IconButton
          variant="ghost"
          size="sm"
          color="#73877B"
          aria-label="Previous day"
          onClick={() => navigate(-1)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") navigate(-1);
          }}
        >
          <GoChevronLeft />
        </IconButton>
        <VStack gap={1}>
          <Heading size="6xl" fontWeight={400} color="#73877B">
            {monthDay}
          </Heading>
          <Text color="#737874" letterSpacing="2.8px">
            {isToday ? `TODAY · ${weekday} · ${year}` : `${weekday} · ${year}`}
          </Text>
        </VStack>
        <IconButton
          variant="ghost"
          size="sm"
          color="#73877B"
          aria-label="Next day"
          onClick={() => navigate(1)}
          disabled={isToday}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") navigate(1);
          }}
        >
          <GoChevronRight />
        </IconButton>
      </HStack>
    </Center>
  );
};
