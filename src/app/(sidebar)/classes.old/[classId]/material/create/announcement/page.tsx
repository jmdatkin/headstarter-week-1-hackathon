"use client";

import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { insertAnnouncement } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";


export default function CreateAnnouncementPage({ params: { classId } }: { params: { classId: string } }) {
    const form = useForm({
        initialValues: {
            title: "",
            text: "",
        },
        validate: zodResolver(insertAnnouncement.pick({ title: true, text: true })),
    });
    const createAnnouncement = api.classes.createAnnouncement.useMutation();

    return (
        <form className="mx-8 my-6" onSubmit={form.onSubmit(async (values) => {
            await createAnnouncement.mutate({
                ...values,
                classId
            });
            notifications.show({ title: "Announcement created", message: "Announcement has been created successfully", color: "teal" });
        })}>
            <h2 className="mb-4">Create Announcement</h2>

            <TextInput
                label="Title"
                placeholder="Title"
                className="w-[60rem] my-4"
                {...form.getInputProps("title")}
            />
            <Textarea
                label="Content"
                placeholder="Description"
                className="w-[60rem] my-4"
                rows={5}
                {...form.getInputProps("text")}
            />

            <Button type="submit" className="mt-4" size="md">Create</Button>
        </form>
    );
}