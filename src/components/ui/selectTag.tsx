"use client";

import { Box, Button, HStack, Menu, Portal, Text } from "@chakra-ui/react";
import { GoChevronDown, GoTag } from "react-icons/go";

export type Tag = { label: string; value: string; color: string };

const TAGS: Tag[] = [
  { label: "Work", value: "Work", color: "#6690e0" },
  { label: "Personal", value: "Personal", color: "#6fa671" },
];

type SelectTagProps = {
  value?: string;
  onChange: (value: string) => void;
};

export const SelectTag = ({ value, onChange }: SelectTagProps) => {
  const selected = TAGS.find((tag) => tag.value === value);

  return (
    <Menu.Root
      onSelect={(details) => onChange(details.value)}
      positioning={{ placement: "bottom-end" }}
    >
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          borderRadius="full"
          borderColor="#c2c8c254"
          color="#737874"
          bg="white"
          fontWeight={400}
        >
          {selected ? (
            <Box
              boxSize="8px"
              borderRadius="full"
              bg={selected.color}
              flexShrink={0}
            />
          ) : (
            <GoTag />
          )}
          {selected?.label ?? "Add tag"}
          <GoChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="180px">
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel color="#737874" fontSize="xs">
                Tags
              </Menu.ItemGroupLabel>
              {TAGS.map((tag) => (
                <Menu.Item
                  key={tag.value}
                  value={tag.value}
                  bg={tag.value === value ? "#f0f1ef" : undefined}
                >
                  <HStack gap={2}>
                    <Box
                      boxSize="8px"
                      borderRadius="full"
                      bg={tag.color}
                      flexShrink={0}
                    />
                    <Text>{tag.label}</Text>
                  </HStack>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
