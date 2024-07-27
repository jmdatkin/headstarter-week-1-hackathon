'use client';

import { MantineProvider, Container, SimpleGrid, Card, Group, Text, Button } from '@mantine/core';

export default function ViewClassesPage() {

  const classes = [
    { id: 1, name: 'Batch 1', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 2, name: 'Batch 2', description: 'Advanced Bibliographies', href: '/classes/[classId]' },
    { id: 3, name: 'Batch 3', description: 'World History', href: '/classes/[classId]' },
  ];

  return (
    <MantineProvider>
      <Container className="flex items-center w-screen min-h-screen py-12" style={{ fontFamily: "'Muli', sans-serif" }}>
        <div className="container mx-auto flex flex-wrap items-start">
          <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
            <h1 className="text-3xl lg:text-4xl text-gray-600 font-extrabold">
              Your Classes
            </h1>
          </div>
          <div className="flex flex-wrap justify-center w-full">
            {classes.map((classItem) => (
              <div key={classItem.id} className="flex justify-center p-4">
                <Card className="bg-white rounded-lg w-64 h-64 transform hover:translate-y-2 hover:shadow-xl transition duration-300" shadow="sm" padding="lg" radius="md" withBorder>
                  <Group className="justify-between mt-md mb-xs">
                    <Text className="text-2xl font-extrabold text-gray-600">{classItem.name}</Text>
                  </Group>

                  <Text className="text-sm text-gray-400">
                    {classItem.description}
                  </Text>

                  <Button className="bg-purple-400 text-white hover:bg-white hover:text-purple-500 hover:shadow-xl transition duration-300" fullWidth mt="md" radius="md" component="a" href={classItem.href}>
                    View Class
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </MantineProvider>
  );
}
