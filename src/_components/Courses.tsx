'use client';

import { useEffect, useState } from 'react';
import { MantineProvider, Container, Card, Group, Text, Badge } from '@mantine/core';

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

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

// Mock fetch functions 
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

async function fetchAnnouncements(): Promise<Announcement[]> {
  return [
    { id: 1, title: 'Holiday Notice', content: 'School will be closed for holidays from December 20th to January 5th.', date: '2023-12-01' },
  ];
}

export default function Courses() {
  const [dueDates, setDueDates] = useState<{ [key: number]: string }>({});
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const classes: ClassItem[] = [
    { id: 1, name: 'Course Name', description: 'Basic Literature in Islam', href: '/classes/[classId]/material' },
    { id: 2, name: 'Course Name', description: 'Advanced Biographies Bibliographies', href: '/classes/[classId]' },
    { id: 3, name: 'Unit 3: History', description: 'World History', href: '/classes/[classId]' },
    { id: 4, name: 'Unit 4: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 5, name: 'Unit 5: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 6, name: 'Unit 6: Islamic Literature', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
  ];

  const units: ClassItem[] = [
    { id: 1, name: 'Unit Name', description: 'Basic Literature in Islam', href: '/classes/[classId]/material' },
    { id: 4, name: 'Unit 4', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
    { id: 5, name: 'Unit 5', description: 'Basic Literature in Islam', href: '/classes/[classId]' },
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

    async function loadAnnouncements() {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    }

    loadDueDates();
    loadAnnouncements();
  }, []);

  return (
    <MantineProvider>
      <Container className="flex items-center w-full min-h-screen py-6" style={{ maxWidth: '1400px', fontFamily: "'Muli', sans-serif" }}>
        <div className="container mx-auto flex flex-wrap items-start">
          <div className="w-full mb-6">
            <Card className="bg-blue-100 rounded-lg p-6" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
              <Text className="text-xl font-bold mb-4" color="blue">Announcements</Text>
              {announcements.map((announcement) => (
                <div key={announcement.id} className="mb-4">
                  <Text className="text-lg font-semibold">{announcement.title}</Text>
                  <Text className="text-sm text-gray-500">{announcement.date}</Text>
                  <Text className="text-sm text-gray-700">{announcement.content}</Text>
                </div>
              ))}
            </Card>
          </div>
          <div className="w-full px-5 lg:px-2">
          <div className="w-full px-5 lg:px-2 mb-4 mt-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl lg:text-4xl text-gray-600 font-extrabold">Courses</h1>
              <Badge style={{ fontSize: '16px', padding: '10px 20px' }} size="xl" color="orange" variant="light">
                Due: {dueDates[3] || 'N/A'}
              </Badge>
            </div>
          </div>
          
            <div className="flex flex-col items-center w-full">
              {classes.map((classItem) => (
                <div key={classItem.id} className="p-4 w-full">
                  <Text className="text-xl font-bold mb-4" color="teal">{classItem.name}</Text>
                  <Card className="bg-gray-100 rounded-lg w-full shadow-lg p-6 relative mb-6" padding="lg" radius="md" withBorder>
                    <a href={classItem.href} className="block w-full">
                      <div className="flex flex-col gap-4">
                        {units.map((unit) => (
                          <Card key={unit.id} className="bg-white rounded-lg w-full transform hover:translate-y-1 hover:shadow-xl transition duration-300" shadow="sm" padding="lg" radius="md" withBorder>
                            <Group className="justify-between mt-md mb-xs">
                              <Text className="text-2xl font-extrabold text-gray-600">{unit.name}</Text>
                            </Group>
                            <Text className="text-sm text-gray-400 p-1">
                              {unit.description}
                            </Text>
                          </Card>
                        ))}
                      </div>
                    </a>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </MantineProvider>
  );
}
