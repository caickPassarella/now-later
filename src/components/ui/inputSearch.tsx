"use client";
import { useState } from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";
import { handleAddThought } from "@/lib/actions";
import { toaster } from "./toaster";

export const InputSearch = () => {
  const [inputValue, setInputValue] = useState("");

  const addThought = async (text: string) => {
    const result = await handleAddThought(text);
    if (result?.success === false) {
      toaster.create({ type: "error", title: result.error });
      return;
    }
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addThought(inputValue);
    }
  };

  return (
    <InputGroup maxW="600px" alignSelf="center" startElement={<GoSearch />}>
      <Input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        variant="subtle"
        placeholder="Search or write..."
        size="lg"
      />
    </InputGroup>
  );
};
