import { HydrateClient } from "@/trpc/server";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = currentUser();

  return (
    <HydrateClient>
      <main>
        <h1>TEST</h1>
        {JSON.stringify(user)}
        <SignOutButton />
      </main>
    </HydrateClient>
  );
}
