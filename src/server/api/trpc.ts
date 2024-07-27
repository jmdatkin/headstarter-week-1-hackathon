import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import * as trpcNext from "@trpc/server/adapters/next";
import { ZodError } from "zod";

import { db } from "@/server/db";
import { getAuth } from "@clerk/nextjs/server";

export const createTRPCContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  return {
    db,
    auth: getAuth(opts.req),
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const authMiddleware = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

const adminMiddleware = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.orgRole || ctx.auth.orgRole !== "org:admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next();
});

export const publicProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = t.procedure
  .use(timingMiddleware)
  .use(authMiddleware);
export const adminProcedure = t.procedure
  .use(timingMiddleware)
  .use(authMiddleware);
// .use(adminMiddleware);
