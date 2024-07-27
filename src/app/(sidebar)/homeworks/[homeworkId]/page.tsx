"use client";
import { useForm } from "@mantine/form";
import { Text, Title, Badge, Textarea, Button, Radio, Stack } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import '@mantine/dropzone/styles.css';

const homework = {
    title: "Math Homework",
    description: "Complete the following questions.",
    dueDate: "08/01/2024",
    questions: [
        {
            title: "Question 1",
            description: "What is 2 + 2?",
            type: "text",
            max_score: 5
        },
        {
            title: "Question 2",
            description: "Upload your solution for the equation.",
            type: "file",
            max_score: 10
        },
        {
            title: "Question 3",
            description: "Is the sky blue? (True/False)",
            type: "tf",
            max_score: 5
        },
        {
            title: "Question 4",
            description: "Which of the following are programming languages?",
            type: "mc",
            options: ["Python", "JavaScript", "Excel", "Word"],
            max_score: 10
        }
    ]
};

export default function ViewHomeworkPage() {
    const form = useForm({
        initialValues: {
            answers: Array(homework.questions.length).fill(""),
        },
    });

    const handleFileDrop = (files, index) => {
        // Handle file input logic here, e.g., saving file data
        console.log(`Files for question ${index + 1}:`, files);
    };

    return (
        <div className="mx-8 my-6 p-8 flex flex-col gap-6">
            <div className="flex items-center">
                <Title order={2}>{homework.title}</Title>
                <Badge color="red" className="ml-4">
                    Due: {homework.dueDate}
                </Badge>
            </div>
            <Text size="md" className="mt-2">
                {homework.description}
            </Text>
            {homework.questions.map((question, index) => (
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
                                    checked={form.values.answers[index] === "true"}
                                />
                                <Radio
                                    label="False"
                                    value="false"
                                    {...form.getInputProps(`answers.${index}`)}
                                    checked={form.values.answers[index] === "false"}
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
            <Button className="w-full mt-4" variant="light">
                Submit Homework
            </Button>
        </div>
    );
}
