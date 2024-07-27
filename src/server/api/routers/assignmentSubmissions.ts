import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  assignmentSubmissions,
  insertAssignmentSubmission,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const assignmentSubmissionsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(assignmentSubmissions);
  }),
  findOne: protectedProcedure
    .input(insertAssignmentSubmission.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.id, input.id));
    }),
  findForUser: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(assignmentSubmissions)
      .where(eq(assignmentSubmissions.userId, ctx.auth.userId!));
  }),
  create: protectedProcedure
    .input(
      insertAssignmentSubmission
        .omit({ id: true })
        .and(insertAssignmentSubmission.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(assignmentSubmissions).values({
        ...input,
        userId: ctx.auth.userId!,
      });
    }),
});
