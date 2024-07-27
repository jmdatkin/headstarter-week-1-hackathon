"use client";
import { useState, useEffect } from "react";
import { Card, Text, Title, Loader, Badge } from "@mantine/core";

export default function ViewReadingPage() {
    const assignment = {
        title: "Reading Assignment",
        content: "Read the following verses from the holy book",
        holyBook: "Quran",
        chapter: 1,
        startVerse: 1,
        endVerse: 7,
    };
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchText() {
            try {
                // http://api.alquran.cloud/v1/surah/114/en.asad
                const response = await fetch(
                    // `https://api.example.com/${assignment.holyBook}/${assignment.chapter}/${assignment.startVerse}-${assignment.endVerse}`
                    `http://api.alquran.cloud/v1/surah/${assignment.chapter}/en.asad?offset=${assignment.startVerse - 1}&limit=${assignment.endVerse - assignment.startVerse + 1}`
                );
                const data = await response.json();
                setText(data.data.ayahs.map((ayah: any) => ayah.text).join(" "));
            } catch (error) {
                setText("Error fetching text");
            } finally {
                setLoading(false);
            }
        }

        fetchText();
    }, [assignment]);

    return (
        <div className="mx-8 my-6 p-8 border flex flex-col gap-2">
            <div className="flex items-center">
                <Title order={2}>
                    {assignment.title}
                </Title>
                <Badge color="blue" className="ml-4">
                    Due: 12/12/2022
                </Badge>
            </div>
            <Badge color="orange" variant="outline" className="mb-4">
                Quran
            </Badge>

            <Text size="md">
                {assignment.content}
            </Text>
            <Text size="lg" className="font-semibold">
                Chapter: {assignment.chapter}
            </Text>
            <Text size="lg" className="font-semibold">
                Verses: {assignment.startVerse} - {assignment.endVerse}
            </Text>

            {loading ? (
                <Loader />
            ) : (
                <div className="border p-4 rounded-lg">
                    <Text size="md">
                        {text}
                    </Text>
                </div>
            )}
        </div>
    );
}
