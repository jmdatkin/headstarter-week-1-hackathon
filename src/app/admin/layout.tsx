import "@/styles/globals.css";
import "@mantine/core/styles.css";

import { type Metadata } from "next";

import { AdminNavbarMinimalColored } from "@/_components/AdminSidebar";

export const metadata: Metadata = {
  title: "LMS System",
  description: "This is a work in progress",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <AdminNavbarMinimalColored />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
}
