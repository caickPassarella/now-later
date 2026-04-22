"use client";
import { IconButton } from "@chakra-ui/react";

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
};

export const ActionButton = ({ onClick, icon }: Props) => {
  return (
    <IconButton
      onClick={onClick}
      size="2xs"
      color="#ffffff"
      bg="#4D6055"
      aria-label="action"
      rounded="full"
      opacity={0}
      transition="opacity 0.15s ease, transform 0.15s ease, color 0.15s ease, box-shadow 0.15s ease"
      _groupHover={{ opacity: 1 }}
      _hover={{
        transform: "scale(1.2)",
        boxShadow: "0 0 0 2px #4d605530",
      }}
    >
      {icon}
    </IconButton>
  );
};
