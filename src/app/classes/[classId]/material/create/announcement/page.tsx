"use client";

import { Accordion, Button, Divider, NumberInput, SegmentedControl, Select, Textarea, TextInput } from "@mantine/core";
import { Fragment, useState } from "react";
import { useForm } from "@mantine/form";


export default function CreateAnnouncementPage() {
    return (
        <form className="mx-8 my-6">
            <h2 className="mb-4">Create Announcement</h2>

            <TextInput
                label="Title"
                placeholder="Title"
                className="w-[60rem] my-4"
            />
            <Textarea label="Content" placeholder="Description" className="w-[60rem] my-4" rows={5} />

            <Button type="submit" className="mt-4" size="md">Create</Button>
        </form>
    );
}