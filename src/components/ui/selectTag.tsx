"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";

export const SelectTag = () => {
  return (
    <Select.Root collection={tags} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select tag</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select tag" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {tags.items.map((tag) => (
              <Select.Item item={tag} key={tag.value}>
                {tag.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const tags = createListCollection({
  items: [
    { label: "work", value: "Work" },
    { label: "personal", value: "Personal" },
  ],
});
