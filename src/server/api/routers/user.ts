import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertUser, selectUser, users } from "@/server/db/schema";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(insertUser.pick({ email: true, username: true, first_name: true, last_name: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values({
        email: input.email,
        username: input.username,
        first_name: input.first_name,
        last_name: input.last_name,
      });
    }),

});
