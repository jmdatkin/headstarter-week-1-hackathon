import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { assignments, insertAssignment } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const assignmentsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(assignments);
  }),
  findOne: publicProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(assignments)
        .where(eq(assignments.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertAssignment
        .omit({ id: true })
        .and(insertAssignment.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(assignments)
        .set(input)
        .where(eq(assignments.id, input.id));
    }),
  delete: publicProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(assignments).where(eq(assignments.id, input.id));
    }),
});
