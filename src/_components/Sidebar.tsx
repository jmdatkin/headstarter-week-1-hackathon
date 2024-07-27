"use client";
import { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    HomeIcon,
    EditIcon,
    BookIcon,
    FileTextIcon,
    ArrowRightLeftIcon
} from 'lucide-react';

interface NavbarLinkProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                className={`w-[50px] h-[50px] rounded-md flex items-center justify-center text-white hover:text-blue-200`}
                data-active={active || undefined}
            >
                <Icon style={{ width: rem(20), height: rem(20) }} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: HomeIcon, label: 'Home' },
    { icon: EditIcon, label: 'Create Material' },
    { icon: BookIcon, label: 'View Assignments' },
    { icon: FileTextIcon, label: 'Announcements' },
];

export function NavbarMinimalColored() {
    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
        />
    ));

    return (
        <nav className="w-[80px] h-full p-4 flex flex-col bg-blue-800">
            <div className="flex-1 mt-[50px]">
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={ArrowRightLeftIcon} label="Logout" />
            </Stack>
        </nav>
    );
}
