import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "LMS System",
  description: "This is a work in progress",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} h-full`}>
        <head>
          <ColorSchemeScript />
        </head>
        <body className="h-full m-0">
          <MantineProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
