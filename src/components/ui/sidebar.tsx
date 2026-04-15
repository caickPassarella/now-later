"use client";

import { Box, chakra, VStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NavLink = chakra(NextLink);

const links = [
  { label: "Thoughts", href: "/" },
  { label: "Deleted", href: "/deleted" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w="80"
      bg="#F5F5F4"
      p={6}
    >
      <VStack align="start" gap={4}>
        <Text fontSize="2xl" fontWeight="bold" color="#4d6055b6" mb={4}>
          Now & Later
        </Text>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <NavLink
              key={link.href}
              href={link.href}
              display="block"
              w="full"
              px={4}
              py={2}
              borderRadius="md"
              fontWeight={isActive ? "bold" : "normal"}
              color={"#73877B"}
              bg={isActive ? "#FFFFFF" : "transparent"}
              _hover={{ bg: "#FFFFFF", color: "#73877B" }}
            >
              {link.label}
            </NavLink>
          );
        })}
      </VStack>
    </Box>
  );
};
