"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";

export default function CustomOrganizationSwitcher() {
  return (
    <OrganizationSwitcher
      hidePersonal
      afterSelectOrganizationUrl={"/dashboard"}
      appearance={{
        layout: {
          shimmer: false,
        },
        elements: {
          rootBox: {
            width: 50,
            height: 50,
            justifyContent: "center",
          },
          organizationPreviewTextContainer__organizationSwitcherTrigger: {
            display: "none",
          },
          organizationSwitcherTriggerIcon: {
            display: "none",
          },
        },
      }}
    />
  );
}
