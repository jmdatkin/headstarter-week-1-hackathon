"use client";
import HeroCard from "@/_components/HeroCard";
import { BookIcon, BrainIcon, MegaphoneIcon, PaperclipIcon } from "lucide-react";
import Link from "next/link";

export default function CreateMaterialPage() {

    return (
        <div className="mx-8 my-6">
            <h2 className="mb-2">Create Material</h2>
            <p>Choose what kind of material you will be creating.</p>

            <div className="flex gap-4 mt-8">
                <HeroCard
                    title="Announcement"
                    description="Broadcast a message to all your students."
                    buttonText="Create Announcement"
                    link="create/announcement"
                />

                <HeroCard
                    title="Reading"
                    description="Mandate students to view and read passages from holy text or other required material."
                    buttonText="Create Reading"
                    link="create/reading"
                />

                <HeroCard
                    title="Homework"
                    description="Assign tasks to your students and allow them to answer questions or submit files."
                    buttonText="Create Homework"
                    link="create/homework"
                />

                {/* <HeroCard
                    title="Quiz"
                    description="Create a quiz with multiple choice, true/false, and short answer questions."
                    buttonText="Create Quiz"
                    link="create/quiz"
                /> */}
            </div>
        </div>
    );
}

function Selection(props: {
    icon: React.ReactNode;
    text: string;
    href: string;
}) {
    return (
        <Link href={props.href}>
            <div className="flex flex-col justify-center items-center border-2 border-gray-500 h-[12rem] w-[15rem] rounded-xl hover:bg-gray-100 transition-colors">
                {props.icon}
                <p className="text-2xl">{props.text}</p>
            </div>
        </Link>
    );
}