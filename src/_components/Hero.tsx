'use client';

import { MantineProvider, Container, Title, Text, Button, Group, ThemeIcon, SimpleGrid, Card } from '@mantine/core';

export default function Hero() {
  return (
    <MantineProvider>
      <Container>
        <section style={{ textAlign: 'center', padding: '5rem 0' }}>
          <Title order={1}>Welcome to Our Project</Title>
          <Text size="lg" my="md">
            We provide amazing blah to boost your blah.
          </Text>
          <Button size="lg" variant="filled" color="blue">
            Get Started
          </Button>
        </section>

        <section>
          <Title order={2} align="center" my="xl">
            Features
          </Title>
          <SimpleGrid cols={3} spacing="lg">
            <Card shadow="sm" padding="lg">
              <ThemeIcon radius="xl" size="xl" color="blue">
                
              </ThemeIcon>
              <Title order={3} mt="md">
                Quizzes
              </Title>
              <Text>
                Our service is blah blah.
              </Text>
            </Card>
            <Card shadow="sm" padding="lg">
              <ThemeIcon radius="xl" size="xl" color="green">
                
              </ThemeIcon>
              <Title order={3} mt="md">
                Assignments
              </Title>
              <Text>
                We prioritize your blah blah.
              </Text>
            </Card>
            <Card shadow="sm" padding="lg">
              <ThemeIcon radius="xl" size="xl" color="red">
                
              </ThemeIcon>
              <Title order={3} mt="md">
                Readings
              </Title>
              <Text>
                Our customers love our blah blah.
              </Text>
            </Card>
          </SimpleGrid>
        </section>
      </Container>
    </MantineProvider>
  );
}