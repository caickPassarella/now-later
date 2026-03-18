"use client";
import { IconButton } from "@chakra-ui/react";
import { GoX } from "react-icons/go";
import { handleDeleteThought } from "@/lib/actions";
import { toaster } from "./toaster";

type Props = {
  id: number;
  onDelete?: (id: number) => void;
};

export const ActionButton = ({ id, onDelete }: Props) => {
  const deleteThought = async () => {
    onDelete?.(id);
    const result = await handleDeleteThought(id);

    if (result?.success === false) {
      toaster.create({ type: "error", title: result.error });
    }
  };

  return (
    <IconButton
      onClick={deleteThought}
      size="2xs"
      color="#667B6F"
      bg="white"
      position="absolute"
      top="-11px"
      right="-11px"
      aria-label="Delete thought"
      rounded="full"
      opacity={0}
      transition="opacity 0.15s ease, transform 0.15s ease, color 0.15s ease, box-shadow 0.15s ease"
      _groupHover={{ opacity: 1 }}
      _hover={{
        transform: "scale(1.2)",
        color: "#e05c5c",
        boxShadow: "0 0 0 2px #e05c5c33",
      }}
    >
      <GoX />
    </IconButton>
  );
};
