import Courses from "@/_components/Courses";
import Hero from "@/_components/Hero";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Courses/>
      </main>
    </HydrateClient>
  );
}
