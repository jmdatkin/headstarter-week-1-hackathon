import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import * as trpcNext from "@trpc/server/adapters/next";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    // headers: req.headers,
    req: req as unknown as trpcNext.CreateNextContextOptions["req"], // Type assertion if needed
    res: {} as trpcNext.CreateNextContextOptions["res"], // Mock response object if necessary
    info: {
      accept: null,
      type: "query",
      isBatchCall: false,
      calls: [],
      connectionParams: null,
      signal: undefined as unknown as AbortSignal,
    },
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
