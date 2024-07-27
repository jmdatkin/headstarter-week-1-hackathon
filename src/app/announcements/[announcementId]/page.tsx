"use client";
import { Text, Title, Badge } from "@mantine/core";

export default function ViewAnnouncementPage() {
    const announcement = {
        title: "Meeting Update",
        content: "There will be a team meeting tomorrow at 10 AM in the main conference room. Please make sure to bring your project updates.",
        date: "07/27/2024"
    };

    return (
        <div className="mx-8 my-6 p-8 border flex flex-col gap-2">
            <div className="flex items-center">
                <Title order={2}>
                    {announcement.title}
                </Title>
                <Badge color="green" className="ml-4">
                    Date: {announcement.date}
                </Badge>
            </div>
            <Text size="md" className="mt-2">
                {announcement.content}
            </Text>
        </div>
    );
}
