import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertQuizSubmission, quizSubmissions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const quizSubmissionsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(quizSubmissions);
  }),
  findOne: publicProcedure
    .input(insertQuizSubmission.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(quizSubmissions)
        .where(eq(quizSubmissions.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertQuizSubmission
        .omit({ id: true })
        .and(insertQuizSubmission.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(quizSubmissions)
        .set(input)
        .where(eq(quizSubmissions.id, input.id));
    }),
  delete: publicProcedure
    .input(insertQuizSubmission.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(quizSubmissions)
        .where(eq(quizSubmissions.id, input.id));
    }),
});
