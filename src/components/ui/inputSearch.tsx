"use client";
import { useState } from "react";
import { Input, InputGroup, HStack, Button } from "@chakra-ui/react";
import { GoSearch } from "react-icons/go";

import { SelectTag } from "./selectTag";

type AddAction = (content: string, tag: string | undefined) => Promise<void>;

type inputSearchProps = {
  action: AddAction;
};

export const InputSearch = ({ action }: inputSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [tag, setTag] = useState<string>();

  const addThought = async (text: string) => {
    setInputValue("");
    await action(text, tag);
    setTag(undefined);
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
      endOffset="-190px"
      endElement={
        <HStack gap={2} pointerEvents="auto">
          <SelectTag value={tag} onChange={setTag} />
          <Button
            size="sm"
            borderRadius="full"
            disabled={!inputValue.trim()}
            bg="#4D6055"
            color="white"
            _disabled={{ bg: "#c2c8c254", color: "#737874" }}
            onClick={() => addThought(inputValue)}
          >
            Save
          </Button>
        </HStack>
      }
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
