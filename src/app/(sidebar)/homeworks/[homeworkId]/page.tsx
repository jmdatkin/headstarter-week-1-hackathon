"use client";
import { useForm } from "@mantine/form";
import { Text, Title, Badge, Textarea, Button, Radio, Stack, LoadingOverlay } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import '@mantine/dropzone/styles.css';
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";

export default function ViewHomeworkPage({ params: { homeworkId } }: { params: { homeworkId: string } }) {
    const form = useForm({
        initialValues: {
            answers: Array.from({ length: 5 }, () => ""),
        },
    });
    const getHomework = api.homeworks.findOne.useQuery({ "id": homeworkId });
    const submitSubmission = api.homeworkSubmissions.create.useMutation();
    const homework = getHomework.data;
    const questions = homework?.questions as {
        title: string;
        description: string;
        max_score: number;
        type: "text" | "file" | "tf" | "mc";
        options?: string[];
    }[] ?? [];

    if (getHomework.isLoading) {
        return <LoadingOverlay />
    }

    const handleFileDrop = (files, index) => {
        // Handle file input logic here, e.g., saving file data
        console.log(`Files for question ${index + 1}:`, files);
    };

    return (
        <form
            className="mx-8 my-6 p-8 flex flex-col gap-6"
            onSubmit={form.onSubmit(async (values) => {
                await submitSubmission.mutateAsync({
                    homeworkId: homeworkId,
                    answers: values.answers
                });
                notifications.show({
                    title: "Homework submitted",
                    message: "Homework has been submitted successfully",
                    color: "teal"
                })
            })}
        >
            <div className="flex items-center">
                <Title order={2}>{homework?.title}</Title>
                <Badge color="red" className="ml-4">
                    Due: {homework?.created_at?.toString()}
                </Badge>
            </div>
            <Text size="md" className="mt-2">
                {homework?.description}
            </Text>
            {questions.map((question, index) => (
                <div key={index} className="p-4 border flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Title order={4}>{question.title}</Title>
                        <Badge color="blue" size="md">/ {question.max_score}</Badge>
                    </div>

                    <Text size="md">{question.description}</Text>
                    {question.type === "text" ? (
                        <Textarea
                            label="Your Answer"
                            placeholder="Type your answer here"
                            {...form.getInputProps(`answers.${index}`)}
                            className="mt-2"
                        />
                    ) : question.type === "file" ? (
                        <Dropzone
                            onDrop={(files) => handleFileDrop(files, index)}
                            onReject={(files) => console.log("Rejected files", files)}
                            maxSize={3 * 1024 ** 2}
                            accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
                            className="mt-2"
                        >
                            <Text size="md">Drop your file here or click to upload</Text>
                        </Dropzone>
                    ) : question.type === "tf" ? (
                        <Radio.Group>
                            <Stack className="mt-2">
                                <Radio
                                    label="True"
                                    value="true"
                                    {...form.getInputProps(`answers.${index}`)}
                                />
                                <Radio
                                    label="False"
                                    value="false"
                                    {...form.getInputProps(`answers.${index}`)}
                                />
                            </Stack>
                        </Radio.Group>
                    ) : question.type === "mc" ? (
                        <Radio.Group>
                            <Stack className="mt-2">
                                {question.options?.map((option, optionIndex) => (
                                    <Radio
                                        key={optionIndex}
                                        label={option}
                                        {...form.getInputProps(`answers.${index}`)}
                                    />
                                ))}
                            </Stack>
                        </Radio.Group>
                    ) : null}
                </div>
            ))}
            <Button type="submit" className="w-full mt-4" variant="light">
                Submit Homework
            </Button>
        </form>
    );
}
