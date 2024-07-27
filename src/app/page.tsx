import Footer from "@/_components/Footer";
import Hero from "@/_components/Hero";
import Navbar from "@/_components/Navbar";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        <Navbar/>
        <Hero/>
        <Footer/>
      </main>
    </HydrateClient>
  );
}
