import Welcome from "@/_components/Welcome";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Welcome/>
      </main>
    </HydrateClient>
  );
}
