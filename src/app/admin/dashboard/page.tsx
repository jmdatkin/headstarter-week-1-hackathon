import Hero from "@/_components/Hero";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Hero />
      </main>
    </HydrateClient>
  );
}
