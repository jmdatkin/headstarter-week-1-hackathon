import "@/styles/globals.css";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import { ClerkProvider } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react"

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "EasyLMS",
  description: "Learning, accelerated.",
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
          <Analytics />
          <MantineProvider>
            <TRPCReactProvider>
              <Notifications />
              {children}
            </TRPCReactProvider>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
