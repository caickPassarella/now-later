"use client";
import { IconButton } from "@chakra-ui/react";
import { GoX } from "react-icons/go";
import { handleDeleteThought } from "@/lib/actions";
import { toaster } from "./toaster";

type Props = {
  id: number;
};

export const ActionButton = ({ id }: Props) => {
  const deleteThought = async () => {
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
    >
      <GoX />
    </IconButton>
  );
};
