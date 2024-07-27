"use client";

import { Button, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { insertAnnouncement } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import { TRPCClientError } from "@trpc/client";
import { isTRPCClientError } from "@/trpc/utils";


export default function CreateAnnouncementPage({ params: { classId } }: { params: { classId: string } }) {
    const form = useForm({
        initialValues: {
            title: "",
            text: "",
        },
        validate: zodResolver(z.object({
            title: z.string().nonempty("Title is required"),
            text: z.string().nonempty("Content is required"),
        })),
    });
    const createAnnouncement = api.classes.createAnnouncement.useMutation();

    return (
        <form className="mx-8 my-6" onSubmit={form.onSubmit(async (values) => {
            try {
                await createAnnouncement.mutate({
                    ...values,
                    classId
                });
                notifications.show({ title: "Announcement created", message: "Announcement has been created successfully", color: "teal" });
            } catch (error) {
                if (isTRPCClientError(error)) {
                    notifications.show({ title: "Error", message: error.message, color: "red" });
                }
                return;
            }
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