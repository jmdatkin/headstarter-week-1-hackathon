'use client';

import { MantineProvider, Container, SimpleGrid, Card, Group, Text, Button } from '@mantine/core';

export default function ViewClassesPage() {

  const classes = [
    { id: 1, name: 'Math 101', description: 'Basic Mathematics', href: '/classes/math-101' },
    { id: 2, name: 'Science 202', description: 'Advanced Science', href: '/classes/science-202' },
    { id: 3, name: 'History 303', description: 'World History', href: '/classes/history-303' },
  ];

  return (
    <MantineProvider>
      <Container className='py-12'>
        <section>
          <SimpleGrid cols={3} spacing="lg">
            {classes.map((classItem) => (
              <Card key={classItem.id} shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{classItem.name}</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  {classItem.description}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md" component="a" href={classItem.href}>
                  View Class
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </section>
      </Container>
    </MantineProvider>
  );
}
