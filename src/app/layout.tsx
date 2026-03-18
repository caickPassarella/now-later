import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { Flex, Box } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Now & Later",
  description:
    "Thoughts for now and later. A simple app to capture your thoughts and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <Provider>
          <Toaster />
          <Flex minH="100vh" bg="gray.100">
            <Box flex={1} bg="#73877B" p={25}>
              {children}
            </Box>
          </Flex>
        </Provider>
      </body>
    </html>
  );
}
