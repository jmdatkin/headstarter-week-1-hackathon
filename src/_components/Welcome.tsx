'use client';

import { MantineProvider, Container, Title, Text, Button } from '@mantine/core';

export default function Welcome() {
  return (
    <MantineProvider>
      <div className="py-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <section className="text-center py-6">
            <Title className="text-4xl font-bold mb-2 text-white" order={1}>Welcome to Our Project</Title>
            <Text size="lg" className="text-2xl mb-4 text-gray-200" my="md">
              We provide amazing blah to boost your blah.
            </Text>
            <Button
              size="lg"
              variant="filled"
              color="blue"
              className="bg-white text-neutral-600 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider"
            >
              Get Started
            </Button>
          </section>
        </div>
      </div>
    </MantineProvider>
  );
}
