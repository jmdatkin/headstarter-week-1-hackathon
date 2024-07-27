import Courses from "@/_components/Courses";
import Hero from "@/_components/Hero";
import { HydrateClient } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = currentUser();

  return (
    <HydrateClient>
      <main>
        <Courses/>
      </main>
    </HydrateClient>
  );
}
