'use client';

import { Container, Title, Text, Button, Group, ThemeIcon, SimpleGrid, Card } from '@mantine/core';

export default function Footer() {
  return (
      <Container>
        <footer style={{ textAlign: 'center', padding: '2rem 0' }}>
          <Text>&copy; 2024 Your Company. All rights reserved.</Text>
        </footer>
      </Container>
  );
}
