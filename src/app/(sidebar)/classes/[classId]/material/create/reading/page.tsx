"use client";
import { Button, Select, Textarea, TextInput } from "@mantine/core";

export default function CreateReadingPage() {
    return (
        <form className="mx-8 my-6">
            <h2 className="mb-4">Create Reading</h2>

            <TextInput
                label="Title"
                placeholder="Title"
                className="w-[60rem] my-4"
            />
            <Textarea label="Content" placeholder="Description" className="w-[60rem] my-4" rows={5} />
            <Select label="Holy Book" placeholder="Select a book" className="w-[60rem] my-4" data={["Bible", "Quran", "Torah"]} />
            <TextInput label="Chapter" placeholder="Chapter" className="w-[60rem] my-4" />
            <TextInput label="Start Verse" placeholder="Verse" className="w-[60rem] my-4" />
            <TextInput label="End Verse" placeholder="Verse" className="w-[60rem] my-4" />

            <Button type="submit" className="mt-4" size="md">Create</Button>
        </form>
    );
}
