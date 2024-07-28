"use client";

import { Button, NumberInput, Select, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";
import { insertReadingMaterial } from "@/server/db/schema";
import { useRouter } from "next/navigation";
import { surahs } from "@/surahs";

export default function CreateReadingPage({ params: { classId } }: { params: { classId: string } }) {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            title: "",
            content: "",
            holyBook: "Quran",
            chapter: "Al-Fatihah",
            startVerse: 1,
            endVerse: 10,
        },
        validate: zodResolver(insertReadingMaterial.pick({ title: true, content: true, holyBook: true, chapter: true, startVerse: true, endVerse: true })),
    });
    const createReading = api.readingMaterials.create.useMutation();

    return (
        <form className="mx-8 my-6" onSubmit={form.onSubmit(async (values) => {
            const result = await createReading.mutateAsync({
                ...values,
                activeAt: new Date(),
                dueAt: new Date(),
                unitId: "TEST",
                materialId: "TEST",
                startVerse: values.startVerse.toString(),
                endVerse: values.endVerse.toString(),
            });
            notifications.show({ title: "Reading created", message: "Reading has been created successfully", color: "teal" });
            if (result) router.push(`/reading/${result.id}`);
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
            {/* <DatePicker
                className="w-[60rem] my-4"
                {...form.getInputProps("activeAt")}
            /> */}
            <Select
                label="Holy Book"
                placeholder="Select a book"
                className="w-[60rem] my-4"
                data={["Bible", "Quran", "Torah"]}
                defaultValue={"Quran"}
                {...form.getInputProps("holyBook")}
            />

            <Select
                label="Surah/Chapter"
                placeholder="Select a Surah/Chapter"
                className="w-[60rem] my-4"
                data={surahs}
                {...form.getInputProps("chapter")}
            />
            <NumberInput
                label="Start Ayah/Verse"
                placeholder="4"
                className="w-[60rem] my-4"
                {...form.getInputProps("startVerse")}
            />
            <NumberInput
                label="End Ayah/Verse"
                placeholder="7"
                className="w-[60rem] my-4"
                {...form.getInputProps("endVerse")}
            />

            <Button type="submit" className="mt-4" size="md">Create</Button>
        </form>
    );
}


