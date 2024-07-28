"use client";

import { useEffect, useState } from 'react';
import { MantineProvider, Container, Card, Group, Text, Badge } from '@mantine/core';
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
function transformClassItem(apiClassItem: ApiClassItem): ClassItem {
  return {
    id: parseInt(apiClassItem.id, 10),
    name: apiClassItem.name || "Unknown Class",
    description: "Description for " + (apiClassItem.name || "Unknown Class"), // Or some other logic to derive description
    href: `/classes/${apiClassItem.id}`
  };
}

function transformAnnouncement(apiAnnouncement: ApiAnnouncement): Announcement {
  return {
    id: parseInt(apiAnnouncement.id, 10),
    title: apiAnnouncement.title,
    text: apiAnnouncement.text,
    createdAt: apiAnnouncement.createdAt,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

export default function Courses() {
  const { data: apiAnnouncements = [], isLoading: announcementsLoading, error: announcementsError } = api.announcements.findAll.useQuery();
  const { data: apiClasses = [], isLoading: classesLoading, error: classesError } = api.classes.findAll.useQuery();

  const announcements: Announcement[] = apiAnnouncements.map(transformAnnouncement);
  const classes: ClassItem[] = apiClasses.map(transformClassItem);

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
                <Text>Error loading announcements</Text>
              ) : (
                announcements.map((announcement: Announcement) => (
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
                <Text>Error loading classes</Text>
              ) : (
                classes.map((classItem: ClassItem) => (
                  <div key={classItem.id} className="p-4 w-full">
                    <Text className="text-xl font-bold mb-4" color="teal">{classItem.name}</Text>
                    <Card className="bg-gray-100 rounded-lg w-full shadow-lg p-6 relative mb-6" padding="lg" radius="md" withBorder>
                      <a href={classItem.href} className="block w-full">
                        <div className="flex flex-col gap-4">
                          <Card className="bg-white rounded-lg w-full transform hover:translate-y-1 hover:shadow-xl transition duration-300" shadow="sm" padding="lg" radius="md" withBorder>
                            <Group className="justify-between mt-md mb-xs">
                              <div>
                                <Text size="lg" weight={500} className="font-bold">Unit Name Goes Here</Text>
                              </div>
                            </Group>
                          </Card>
                        </div>
                      </a>
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
