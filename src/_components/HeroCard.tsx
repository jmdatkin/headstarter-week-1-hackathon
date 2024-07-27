import { Card, Group, Text, Button, Image } from "@mantine/core";
import Link from "next/link";

export default function HeroCard(props: {
    title: string;
    description: string;
    buttonText: string;
    link: string
}) {
    return <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
            <Image
                src="https://cdni.iconscout.com/illustration/premium/thumb/girl-completing-assignment-on-deadline-5255995-4393625.png?f=webp"
                height={160}
                width={160}
                alt="Live Quizzes"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{props.title}</Text>
        </Group>

        <Text size="sm" c="dimmed">
            {props.description}
        </Text>

        <Link href={props.link}>
            <Button color="blue" fullWidth mt="md" radius="md">
                {props.buttonText}
            </Button>
        </Link>
    </Card>
}