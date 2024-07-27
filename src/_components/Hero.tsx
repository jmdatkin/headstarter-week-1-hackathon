"use client";

import {
  Button,
  Card,
  Container,
  Group,
  Image,
  MantineProvider,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

export default function Hero() {
  return (
    <MantineProvider>
      <div className="py-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl">
        <div className="container mx-auto px-4">
          <section className="text-center py-6">
            <Title className="text-4xl font-bold mb-2 text-white" order={1}>
              Welcome to Our Project
            </Title>
            <Text size="lg" className="text-2xl mb-4 text-gray-200" my="md">
              We provide amazing blah to boost your blah.
            </Text>
          </section>
        </div>
      </div>
      <Container className="py-12">
        <section>
          <SimpleGrid cols={3} spacing="lg">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://cdni.iconscout.com/illustration/premium/thumb/girl-completing-assignment-on-deadline-5255995-4393625.png?f=webp"
                  height={160}
                  alt="Live Quizzes"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Live Quizzes</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Transform your events and classrooms into interactive
                experiences with our live quiz feature.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Join a Quiz
              </Button>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://cdni.iconscout.com/illustration/premium/thumb/girl-doing-online-assignment-5255996-4393626.png"
                  height={160}
                  alt="Assignments"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Assignments</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Students can submit their assignments as they work through the
                weeks. Teachers can monitor submissions!
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Work on Assignments
              </Button>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://cdni.iconscout.com/illustration/premium/thumb/girl-doing-online-graduation-study-5255994-4393624.png?f=webp"
                  height={160}
                  alt="Readings"
                />
              </Card.Section>

              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Readings</Text>
              </Group>

              <Text size="sm" c="dimmed">
                Keep your students engaged and assign your religious scripture
                readings with our readings feature.
              </Text>

              <Button color="blue" fullWidth mt="md" radius="md">
                Get to Reading
              </Button>
            </Card>
          </SimpleGrid>
        </section>
      </Container>
    </MantineProvider>
  );
}
