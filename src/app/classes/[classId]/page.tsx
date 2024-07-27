'use client';

import { useEffect, useState } from 'react';
import { MantineProvider, Container, Card, Group, Text, Button, Badge } from '@mantine/core';

// Define types
interface ClassItem {
  id: number;
  name: string;
  description: string;
  href: string;
}

interface DueDate {
  unitId: number;
  dueAt: string;
}

// Mock fetch function 
async function fetchDueDates(): Promise<DueDate[]> {
  return [
    { unitId: 1, dueAt: '2023-08-01' },
    { unitId: 2, dueAt: '2023-09-01' },
    { unitId: 3, dueAt: '2023-10-01' },
    { unitId: 4, dueAt: '2023-11-01' },
    { unitId: 5, dueAt: '2023-12-01' },
    { unitId: 6, dueAt: '2024-01-01' },
  ];
}

export default function ViewClassPage() {
  const [dueDates, setDueDates] = useState<{ [key: number]: string }>({});

  const classes: ClassItem[] = [
    { id: 1, name: 'Unit 1: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]/material' },
    { id: 2, name: 'Unit 2: Biographies', description: 'Advanced Biographies Bibliographies', href: '/classes/[classId]' },
    { id: 3, name: 'Unit 3: History', description: 'World History', href: '/classes/[classId]' },
    { id: 4, name: 'Unit 4: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 5, name: 'Unit 5: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 6, name: 'Unit 6: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
  ];

  useEffect(() => {
    async function loadDueDates() {
      const data = await fetchDueDates();
      const dueDatesMap = data.reduce((acc, item) => {
        acc[item.unitId] = item.dueAt;
        return acc;
      }, {} as { [key: number]: string });
      setDueDates(dueDatesMap);
    }

    loadDueDates();
  }, []);

  return (
    <MantineProvider>
      <Container className="flex items-center w-screen min-h-screen py-12" style={{ fontFamily: "'Muli', sans-serif" }}>
        <div className="container mx-auto flex flex-wrap items-start">
          <div className="w-full pl-5 lg:pl-2 mb-4 mt-4">
            <h1 className="text-3xl lg:text-4xl text-gray-600 font-extrabold">
              Your Units
            </h1>
          </div>
          <div className="flex flex-wrap justify-center w-full">
            {classes.map((classItem) => (
              <div key={classItem.id} className="flex justify-center p-4">
                <Card className="bg-white rounded-lg w-64 h-64 transform hover:translate-y-2 hover:shadow-xl transition duration-300" shadow="sm" padding="lg" radius="md" withBorder>
                  <Group className="justify-between mt-md mb-xs">
                    <Text className="text-2xl font-extrabold text-gray-600">{classItem.name}</Text>
                  </Group>

                  <Text className="text-sm text-gray-400 p-1">
                    {classItem.description}
                  </Text>
                  <Badge className="normal-case text-sm px-2 py-1" size="l" color="orange" variant="light">
                    Due: {dueDates[classItem.id] || 'N/A'}
                  </Badge>
                  <Button className="bg-purple-400 text-white hover:bg-white hover:text-purple-500 hover:shadow-xl transition duration-300" fullWidth mt="md" radius="md" component="a" href={classItem.href}>
                    View Materials
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
