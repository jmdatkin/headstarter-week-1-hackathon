"use client";

import { api } from "@/trpc/react";
import { Accordion, Button, Divider, NumberInput, SegmentedControl, Textarea, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { z } from "zod";

export default function CreateHomeworkPage({ params: { classId } }: { params: { classId: string } }) {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            questions: [
                {
                    title: "",
                    description: "",
                    max_score: 5,
                    type: "text",
                },
            ],
        },
        validate: zodResolver(z.object({
            title: z.string().nonempty("Title is required"),
            description: z.string().nonempty("Description is required"),
            questions: z.array(z.object({
                title: z.string().nonempty("Question title is required"),
                description: z.string().nonempty("Question description is required"),
                max_score: z.number().int().min(1, "Max score must be at least 1"),
                type: z.enum(["text", "mc", "tf", "file"]),
            })).nonempty("At least one question is required"),
        }))
    });
    const createHomework = api.homeworks.create.useMutation();

    return (
        <form className="mx-8 my-6" onSubmit={form.onSubmit(async (values) => {
            await createHomework.mutateAsync({
                ...values,
                materialId: "TEST"
            });
            notifications.show({ title: "Homework created", message: "Homework has been created successfully", color: "teal" });
            router.push(`/classes/${classId}/`);
        })}>
            <h2 className="mb-4">Create Homework</h2>

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
                {...form.getInputProps("description")}
            />

            <Accordion
                classNames={{
                    item: "border",
                }}
                defaultValue={["questions"]}
                multiple
            >
                <Accordion.Item value="questions">
                    <Accordion.Control>Questions</Accordion.Control>
                    <Accordion.Panel>
                        {form.values.questions.map((question, index) => {
                            const isLast = index === form.values.questions.length - 1;
                            const isFirst = index === 0;

                            return (
                                <Fragment key={index}>
                                    <Divider
                                        id={`question-${index + 1}`}
                                        label={`Question ${index + 1}`}
                                        className="mt-4"
                                        labelPosition="left"
                                    />

                                    {!isFirst && (
                                        <Button
                                            color="red"
                                            onClick={() => form.removeListItem("questions", index)}
                                            className="w-20"
                                            size="compact-xs"
                                        >
                                            Delete
                                        </Button>
                                    )}

                                    <div className="flex flex-col gap-4 p-4">
                                        <div className="grid grid-cols-2 gap-8">
                                            <TextInput
                                                label="Question Title"
                                                placeholder="What is the question about?"
                                                key={form.key(`questions.${index}.title`)}
                                                withAsterisk
                                                {...form.getInputProps(`questions.${index}.title`)}
                                            />
                                            <div className="col-span-1">
                                                <p className="text-sm font-medium">Question Type</p>
                                                <SegmentedControl
                                                    data={[
                                                        { value: "text", label: "Text" },
                                                        { value: "tf", label: "True/False" },
                                                        { value: "file", label: "File" },
                                                    ]}
                                                    key={form.key(`questions.${index}.type`)}
                                                    className="h-fit w-full"
                                                    {...form.getInputProps(`questions.${index}.type`)}
                                                />
                                            </div>
                                            <NumberInput
                                                label="Max Score"
                                                key={form.key(`questions.${index}.max_score`)}
                                                {...form.getInputProps(`questions.${index}.max_score`)}
                                            />
                                            <Textarea
                                                label="Question Description"
                                                placeholder="Describe the question here"
                                                rows={4}
                                                className="col-span-2"
                                                key={form.key(`questions.${index}.description`)}
                                                {...form.getInputProps(`questions.${index}.description`)}
                                            />

                                        </div>
                                    </div>

                                    {isLast && (
                                        <Button
                                            onClick={() =>
                                                form.insertListItem("questions", {
                                                    title: "",
                                                    description: "",
                                                    max_score: 0,
                                                    type: "text",
                                                })
                                            }
                                            className="w-full mt-4"
                                            variant="light"
                                        >
                                            Add Question
                                        </Button>
                                    )}
                                </Fragment>
                            );
                        })}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            <Button type="submit" className="mt-4" size="md">Create Homework</Button>
        </form>
    );
}
