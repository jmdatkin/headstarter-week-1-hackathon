import { Button } from "@mantine/core";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBack() {
    const router = useRouter();

    return <Button
        onClick={() => router.back()}
        className="flex gap-2"
    >
        <ArrowLeftIcon />
        Go back
    </Button>
}