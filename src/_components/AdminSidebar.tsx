"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Stack, UnstyledButton } from "@mantine/core";
import { ArrowRightLeftIcon, EditIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import CustomOrganizationSwitcher from "./CustomOrganizationSwitcher";

interface NavbarLinkProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

function NavbarLink({ icon: Icon, label, href }: NavbarLinkProps) {
  return (
    <Link href={href}>
      <UnstyledButton
        className={`rounded-md flex items-center justify-center text-white hover:text-blue-200`}
      >
        <div className="flex gap-3 w-full">
          <Icon />
          <p>{label}</p>
        </div>
      </UnstyledButton>
    </Link>
  );
}

const mockdata = [
  { icon: HomeIcon, label: "Home", href: "/admin/dashboard" },
  {
    icon: EditIcon,
    label: "Create Material",
    href: "/classes/test/material/create",
  },
];

export function AdminNavbarMinimalColored() {
  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} />
  ));

  return (
    <nav className="w-[250px] h-full px-2 py-4 flex flex-col bg-blue-800">
      <div className="flex-1 mt-[50px]">
        <Stack justify="center" align="center" gap={12}>
          <CustomOrganizationSwitcher />

          <div className="mt-8 flex flex-col gap-4">{links}</div>
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <SignOutButton>
          <UnstyledButton
            className={`rounded-md flex items-center justify-center text-white hover:text-blue-200`}
          >
            <div className="ml-4 flex gap-4 w-full">
              <ArrowRightLeftIcon />
              <p>Log out</p>
            </div>
          </UnstyledButton>
        </SignOutButton>
      </Stack>
    </nav>
  );
}
