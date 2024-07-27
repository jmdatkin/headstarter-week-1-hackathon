"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function CustomOrganizationSwitcher() {
  return (
    <OrganizationSwitcher
      afterSelectOrganizationUrl={"/dashboard"}
      appearance={{
        layout: {
          shimmer: false,
        },

        elements: {
          organizationPreviewTextContainer: false,
        },
      }}
    />
  );
}
