"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

export function LatestUser() {
  const latestUser = api.user.hello.useQuery({ "text": "world" });
  const createUser = api.user.create.useMutation();
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-xs">
      {latestUser.data ? (
        <p className="truncate">Your most recent post: {latestUser.data.greeting}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createUser.isPending}
        >
          {createUser.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
