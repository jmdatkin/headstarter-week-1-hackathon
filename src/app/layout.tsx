import "@/styles/globals.css";
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { NavbarMinimalColored } from "@/_components/Sidebar";

export const metadata: Metadata = {
  title: "LMS System",
  description: "This is a work in progress",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="h-full m-0">
        <MantineProvider>
          <TRPCReactProvider>
            <div className="flex h-screen">
              <NavbarMinimalColored />
              <main className="flex-1 p-4 overflow-auto">
                {children}
              </main>
            </div>
          </TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
