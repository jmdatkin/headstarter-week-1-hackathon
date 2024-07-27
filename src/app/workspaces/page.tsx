"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function Workspaces() {
  return (
    <div>
      <OrganizationSwitcher />
    </div>
  );
}
