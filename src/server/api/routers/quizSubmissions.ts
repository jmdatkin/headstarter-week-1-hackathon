import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { insertQuizSubmission, quizSubmissions } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const quizSubmissionsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(quizSubmissions);
  }),
  findOne: protectedProcedure
    .input(insertQuizSubmission.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(quizSubmissions)
        .where(eq(quizSubmissions.id, input.id));
    }),
  findForUser: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(quizSubmissions)
      .where(eq(quizSubmissions.userId, ctx.auth.userId!));
  }),
  create: protectedProcedure
    .input(insertQuizSubmission.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(quizSubmissions).values({
        ...input,
        userId: ctx.auth.userId!,
      });
    }),
});
