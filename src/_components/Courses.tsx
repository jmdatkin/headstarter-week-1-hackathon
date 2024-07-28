"use client";

import { MantineProvider, Container, Card, Group, Text, Badge, Button } from '@mantine/core';
import { api } from "@/trpc/react";

interface ApiClassItem {
  id: string;
  name: string | null;
  gradeLevelId: string;
  orgId: string | null;
}

interface ClassItem {
  id: number;
  name: string;
  description: string;
  href: string;
}

interface ApiAnnouncement {
  id: string;
  text: string;
  classId: string;
  title: string;
  createdAt?: string;
}

interface Announcement {
  id: number;
  title: string;
  text: string;
  createdAt?: string;
}

interface ApiUnit {
  id: string;
  name: string | null;
  classId: string;
}

interface Unit {
  id: number;
  name: string;
  classId: number;
}

const transformClassItem = (apiClassItem: ApiClassItem): ClassItem => ({
  id: parseInt(apiClassItem.id, 10),
  name: apiClassItem.name ?? "Unknown Class",
  description: `Description for ${apiClassItem.name ?? "Unknown Class"}`,
  href: `/classes/${apiClassItem.id}`,
});

const transformAnnouncement = (apiAnnouncement: ApiAnnouncement): Announcement => ({
  id: parseInt(apiAnnouncement.id, 10),
  title: apiAnnouncement.title,
  text: apiAnnouncement.text,
  createdAt: apiAnnouncement.createdAt,
});

const transformUnit = (apiUnit: ApiUnit): Unit => ({
  id: parseInt(apiUnit.id, 10),
  name: apiUnit.name ?? "Unknown Unit",
  classId: parseInt(apiUnit.classId, 10),
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

const ReadingCard = ({ readingId }: { readingId: string }) => (
  <Card className="bg-green-100 rounded-lg p-4 mt-4" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
    <Text className="text-md font-bold" color="green">Reading</Text>
    <Button component="a" href={`/reading/test-reading`} color="green" variant="light" fullWidth mt="sm">
      Read 20 verses from Chapter 3 With Meaning
    </Button>
    <Button component="a" href={`/reading/test-reading`} color="green" variant="light" fullWidth mt="sm">Start Reading
    </Button>
  </Card>
);

const HomeworkCard = () => (
  <Card className="bg-yellow-100 rounded-lg p-4 mt-4" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
    <Text className="text-md font-bold" color="yellow">Homework</Text>
    <Button component="a" href="/homeworks/test-homework" color="yellow" variant="light" fullWidth mt="sm">
      Write 250 words+ essay on seerah narration
    </Button>
    <Button component="a" href={`/homeworks/test-homework`} color="yellow" variant="light" fullWidth mt="sm">Submit
    </Button>
  </Card>
);

export default function Courses() {
  const { data: apiAnnouncements, isLoading: announcementsLoading, error: announcementsError } = api.announcements.findAll.useQuery();
  const { data: apiClasses, isLoading: classesLoading, error: classesError } = api.classes.findAll.useQuery();
  const { data: apiUnits, isLoading: unitsLoading, error: unitsError } = api.units.findAll.useQuery();

  const announcements: Announcement[] = apiAnnouncements?.map(transformAnnouncement) || [];
  const classes: ClassItem[] = apiClasses?.map(transformClassItem) || [];
  const units: Unit[] = apiUnits?.map(transformUnit) || [];

  return (
    <MantineProvider>
      <Container className="flex items-center w-full min-h-screen py-6" style={{ maxWidth: '1400px', fontFamily: "'Muli', sans-serif" }}>
        <div className="container mx-auto flex flex-wrap items-start">
          <div className="w-full mb-6">
            <Card className="bg-blue-100 rounded-lg p-6" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
              <Text className="text-xl font-bold mb-4" color="blue">Announcements</Text>
              {announcementsLoading ? (
                <Text>Loading...</Text>
              ) : announcementsError ? (
                <Text>Error loading announcements: {announcementsError.message}</Text>
              ) : (
                announcements.map((announcement) => (
                  <div key={announcement.id} className="mb-4">
                    <Text className="text-lg font-semibold">{announcement.title}</Text>
                    <Text className="text-sm text-gray-700">{announcement.text}</Text>
                    {announcement.createdAt && (
                      <Text className="text-sm text-gray-500">{formatDate(announcement.createdAt)}</Text>
                    )}
                  </div>
                ))
              )}
            </Card>
          </div>
          <div className="w-full px-5 lg:px-2">
            <div className="w-full px-5 lg:px-2 mb-4 mt-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl lg:text-4xl text-gray-600 font-extrabold">Courses</h1>
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              {classesLoading ? (
                <Text>Loading...</Text>
              ) : classesError ? (
                <Text>Error loading classes: {classesError.message}</Text>
              ) : (
                classes.map((classItem) => (
                  <div key={classItem.id} className="p-4 w-full">
                    <Text className="text-xl font-bold mb-4 text-neutral-600">{classItem.name}</Text>
                    <Card className="bg-neutral-100 rounded-lg w-full shadow-lg p-6 relative mb-6" padding="lg" radius="md" withBorder>
                      <div className="flex flex-col gap-4">
                        {unitsLoading ? (
                          <Text>Loading...</Text>
                        ) : unitsError ? (
                          <Text>Error loading units: {unitsError.message}</Text>
                        ) : (
                          units
                            .filter(unit => unit.classId === classItem.id)
                            .map((unit) => (
                              <Card key={unit.id} className="bg-white rounded-lg w-full transform hover:translate-y-1 hover:shadow-xl transition duration-300 mb-4" shadow="sm" padding="lg" radius="md" withBorder>
                                <Group className="justify-between mt-md mb-xs">
                                  <div>
                                    <Text size="lg" className="font-bold text-blue-500">{unit.name}</Text>
                                    <div className="flex flex-row gap-4 mt-2 w-full">
                                      <ReadingCard readingId={unit.id.toString()} />
                                      <HomeworkCard />
                                    </div>
                                  </div>
                                </Group>
                              </Card>
                            ))
                        )}
                      </div>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Container>
    </MantineProvider>
  );
}
