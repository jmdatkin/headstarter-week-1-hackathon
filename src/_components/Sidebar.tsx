"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Stack, Tooltip, UnstyledButton, rem } from "@mantine/core";
import {
  ArrowRightLeftIcon,
  BookIcon,
  EditIcon,
  FileTextIcon,
  HomeIcon,
  ZoomInIcon,
} from "lucide-react";
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
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton
          className={`w-[50px] h-[50px] rounded-md flex items-center justify-center text-white hover:text-blue-200`}
        >
          <Icon style={{ width: rem(20), height: rem(20) }} />
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

const mockdata = [
  { icon: HomeIcon, label: "Home", href: "/" },
  {
    icon: EditIcon,
    label: "Create Material",
    href: "/classes/test/material/create",
  },
  { icon: ZoomInIcon, label: "View Readings", href: "/reading/test" },
  { icon: BookIcon, label: "View Homeworks", href: "/homeworks/test" },
  // { icon: MailQuestionIcon, label: 'View Quizzes', href: "/quizzes/test" },
  { icon: FileTextIcon, label: "Announcements", href: "/announcements" },
];

export function NavbarMinimalColored() {
  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} />
  ));

  return (
    <nav className="w-[80px] h-full p-4 flex flex-col bg-blue-800">
      <div className="flex-1 mt-[50px]">
        <Stack justify="center" align="center" gap={0}>
          <CustomOrganizationSwitcher />
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <SignOutButton>
          <NavbarLink icon={ArrowRightLeftIcon} label="Logout" href="#" />
          {/* <ArrowRightLeftIcon className="text-white" /> */}
        </SignOutButton>
      </Stack>
    </nav>
  );
}
