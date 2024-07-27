import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  homeworkSubmissions,
  insertHomeworkSubmission,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const homeworkSubmissionsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(homeworkSubmissions);
  }),
  findOne: protectedProcedure
    .input(insertHomeworkSubmission.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(homeworkSubmissions)
        .where(eq(homeworkSubmissions.id, input.id));
    }),
  findForUser: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(homeworkSubmissions)
      .where(eq(homeworkSubmissions.userId, ctx.auth.userId!));
  }),
  create: protectedProcedure
    .input(
      insertHomeworkSubmission
        .omit({ id: true, userId: true, score: true, submittedAt: true })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(homeworkSubmissions).values({
        ...input,
        score: "0",
        submittedAt: new Date(),
        userId: ctx.auth.userId!,
      });
    }),
});
