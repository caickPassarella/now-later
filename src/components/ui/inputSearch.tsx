"use client";
import { useState } from "react";
import { Input, InputGroup } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

type AddAction = (content: string) => Promise<void>;

type inputSearchProps = {
  action: AddAction;
};

export const InputSearch = ({ action }: inputSearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const addThought = async (text: string) => {
    setInputValue("");
    await action(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addThought(inputValue);
    }
  };

  return (
    <InputGroup
      paddingBottom={12}
      alignSelf="center"
      startElement={<GoSearch />}
    >
      <Input
        padding={8}
        borderRadius={12}
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
