import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  assignmentSubmissions,
  insertAssignmentSubmission,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const assignmentSubmissionsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(assignmentSubmissions);
  }),
  findOne: publicProcedure
    .input(insertAssignmentSubmission.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(assignmentSubmissions)
        .where(eq(assignmentSubmissions.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertAssignmentSubmission
        .omit({ id: true })
        .and(insertAssignmentSubmission.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(assignmentSubmissions)
        .set(input)
        .where(eq(assignmentSubmissions.id, input.id));
    }),
  delete: publicProcedure
    .input(insertAssignmentSubmission.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(assignmentSubmissions)
        .where(eq(assignmentSubmissions.id, input.id));
    }),
});
