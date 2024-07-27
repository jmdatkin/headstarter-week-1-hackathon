"use client";
import { BookIcon, BrainIcon, MegaphoneIcon, PaperclipIcon } from "lucide-react";
import Link from "next/link";

export default function CreateMaterialPage() {

    return (
        <div className="mx-8 my-6">
            <h2 className="mb-2">Create Material</h2>
            <p>Choose what kind of material you will be creating.</p>

            <div className="flex gap-4 mt-8">
                <Selection icon={<MegaphoneIcon size={48} />} text="Announcement" href="create/announcement" />
                <Selection icon={<BookIcon size={48} />} text="Reading" href="create/reading" />
                <Selection icon={<PaperclipIcon size={48} />} text="Homework" href="create/homework" />
                <Selection icon={<BrainIcon size={48} />} text="Quiz" href="create/quiz" />
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