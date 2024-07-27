"use client";

import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";
import { insertReadingMaterial } from "@/server/db/schema";

export default function CreateReadingPage() {
    const form = useForm({
        initialValues: {
            title: "",
            content: "",
            holyBook: "",
            chapter: "",
            startVerse: "",
            endVerse: "",
        },
        validate: zodResolver(insertReadingMaterial.pick({ title: true, content: true, holyBook: true, chapter: true, startVerse: true, endVerse: true })),
    });

    const createReading = api.readings.createReading.useMutation();

    return (
        <form className="mx-8 my-6" onSubmit={form.onSubmit(async (values) => {
            await createReading.mutate(values);
            notifications.show({ title: "Reading created", message: "Reading has been created successfully", color: "teal" });
        })}>
            <h2 className="mb-4">Create Reading</h2>

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
                {...form.getInputProps("content")}
            />
            <Select
                label="Holy Book"
                placeholder="Select a book"
                className="w-[60rem] my-4"
                data={["Bible", "Quran", "Torah"]}
                {...form.getInputProps("holyBook")}
            />
            <TextInput
                label="Chapter"
                placeholder="Chapter"
                className="w-[60rem] my-4"
                {...form.getInputProps("chapter")}
            />
            <TextInput
                label="Start Verse"
                placeholder="Verse"
                className="w-[60rem] my-4"
                {...form.getInputProps("startVerse")}
            />
            <TextInput
                label="End Verse"
                placeholder="Verse"
                className="w-[60rem] my-4"
                {...form.getInputProps("endVerse")}
            />

            <Button type="submit" className="mt-4" size="md">Create</Button>
        </form>
    );
}
