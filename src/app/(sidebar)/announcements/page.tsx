"use client";
import { Text, Title, Badge } from "@mantine/core";

export default function ViewAnnouncementsPage() {
    const announcements = [
        {
            title: "Meeting Update",
            content: "There will be a team meeting tomorrow at 10 AM in the main conference room. Please make sure to bring your project updates.",
            date: "07/27/2024"
        },
        {
            title: "Holiday Notice",
            content: "The office will be closed on August 15th for the holiday. Please plan accordingly.",
            date: "07/26/2024"
        },
        {
            title: "Policy Change",
            content: "Starting next month, the new work-from-home policy will be in effect. Details will be shared in the upcoming meeting.",
            date: "07/25/2024"
        }
    ];

    return (
        <div className="mx-8 my-6 flex flex-col gap-6">
            {announcements.map((announcement, index) => (
                <div key={index} className="p-8 border flex flex-col gap-2">
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
            ))}
        </div>
    );
}
