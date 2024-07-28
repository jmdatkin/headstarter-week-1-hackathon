"use client";
import { useState, useEffect } from "react";
import { Card, Text, Title, Loader, Badge } from "@mantine/core";
import GoBack from "@/_components/GoBack";
import { api } from "@/trpc/react";
import { surahs } from "@/surahs";
import { skipToken } from "@tanstack/react-query";

export default function ViewReadingPage({ params: { readingId } }: { params: { readingId: string } }) {
    const getAssignment = api.readingMaterials.findOne.useQuery({ id: readingId });
    const assignment = getAssignment.data;
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const getSimplified = api.readingMaterials.getSimplified.useQuery(text !== "" ? { content: text } : skipToken);

    useEffect(() => {
        if (!assignment) return;

        async function fetchText() {
            try {
                // http://api.alquran.cloud/v1/surah/114/en.asad
                const response = await fetch(
                    `http://api.alquran.cloud/v1/surah/${surahs.indexOf(assignment!.reading_materials.chapter) + 1}/en.asad?offset=${Number(assignment!.reading_materials.startVerse) - 1}&limit=${Number(assignment!.reading_materials.endVerse) - Number(assignment!.reading_materials.startVerse) + 1}`
                    // `http://api.alquran.cloud/v1/surah/${assignment.chapter}/en.asad?offset=${assignment.startVerse - 1}&limit=${assignment.endVerse - assignment.startVerse + 1}`
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
        <>
            <GoBack />

            <div className="mx-8 my-6 p-8 border flex flex-col gap-2">
                <div className="flex items-center">
                    <Title order={2}>
                        {assignment?.reading_materials.title}
                    </Title>
                    <Badge color="blue" className="ml-4">
                        Due: 12/12/2022
                    </Badge>
                </div>
                <Badge color="orange" variant="outline" className="mb-4">
                    Quran
                </Badge>

                <Text size="md">
                    {assignment?.reading_materials.content}
                </Text>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="border p-4 rounded-lg">
                        <h3 className="mb-3 text-2xl">{assignment?.reading_materials.chapter} ({assignment?.reading_materials.startVerse} - {assignment?.reading_materials.endVerse})</h3>

                        <Text size="md">
                            {text}
                        </Text>
                    </div>
                )}

                {getSimplified.isLoading ? (
                    <Loader />
                ) : (
                    <div className="border p-4 rounded-lg">
                        <h3 className="text-2xl">Simplification</h3>
                        <Badge className="mb-3 ">Powered by AI</Badge>

                        <Text size="md">
                            {getSimplified.data ?? "unavailable"}
                        </Text>
                    </div>
                )}
            </div>
        </>
    );
}
