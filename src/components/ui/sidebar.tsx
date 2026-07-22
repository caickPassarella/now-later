"use client";

import {
  Box,
  chakra,
  VStack,
  HStack,
  Square,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

// Icons
import { BsDeviceHddFill } from "react-icons/bs";
import { RiRam2Fill, RiDeleteBinFill, RiHourglassFill } from "react-icons/ri";

const NavLink = chakra(NextLink);

const links = [
  { label: "Thoughts", href: "/", icon: BsDeviceHddFill },
  { label: "Daily", href: "/daily", icon: RiRam2Fill },
  { label: "Deleted", href: "/deleted", icon: RiDeleteBinFill },
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
        <HStack gap={3} mb={2} align="center">
          <Square
            size={10}
            flexShrink={0}
            borderRadius="lg"
            bgGradient="to-br"
            gradientFrom="#73877B"
            gradientTo="#4d6055"
            color="white"
            boxShadow="sm"
          >
            <RiHourglassFill size={18} />
          </Square>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="#4d6055"
            letterSpacing="tight"
            lineHeight="1.1"
          >
            Now{" "}
            <chakra.span color="#73877B" fontWeight="medium">
              &
            </chakra.span>{" "}
            Later
          </Text>
        </HStack>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <ChakraLink asChild key={link.href} _hover={{ textDecoration: "none" }}>
              <NavLink
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
                <HStack>
                  {link.icon && <link.icon />}
                  {link.label}
                </HStack>
              </NavLink>
            </ChakraLink>
          );
        })}
      </VStack>
    </Box>
  );
};
