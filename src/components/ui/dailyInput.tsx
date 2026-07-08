"use client";
import { useState, useRef, useEffect } from "react";
import { Input, InputGroup, HStack, Text, VStack } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

const currentTimeStr = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

type AddAction = (content: string, occurredAt: string) => Promise<void>;

type DailyInputProps = {
  date: string;
  onAdd: AddAction;
};

export const DailyInput = ({ date, onAdd }: DailyInputProps) => {
  const [text, setText] = useState("");
  const [time, setTime] = useState(currentTimeStr);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      } else {
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const add = async () => {
    if (!text.trim()) return;

    const [hours, minutes] = time.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);
    const occurredAt = new Date(year, month - 1, day, hours, minutes, 0, 0);

    await onAdd(text, occurredAt.toISOString());
    setText("");
    setTime(currentTimeStr());
    inputRef.current?.focus();
  };

  return (
    <VStack gap={2} alignSelf="center" w="full" paddingBottom={10}>
      <InputGroup startElement={<GoSearch />}>
        <Input
          ref={inputRef}
          padding={8}
          borderRadius={12}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          value={text}
          variant="subtle"
          placeholder="What did you do?"
          size="lg"
        />
      </InputGroup>
      <HStack gap={2} justify="center">
        <Text fontSize="xs" color="#737874">
          at
        </Text>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          style={{
            background: "transparent",
            border: "none",
            color: "#737874",
            fontSize: "12px",
            cursor: "pointer",
            outline: "none",
          }}
        />
      </HStack>
    </VStack>
  );
};
