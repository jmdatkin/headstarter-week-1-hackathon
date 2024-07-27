import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { assignments, insertAssignment } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const assignmentsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(assignments);
  }),
  findOne: protectedProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(assignments)
        .where(eq(assignments.id, input.id));
    }),
  create: adminProcedure
    .input(insertAssignment.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(assignments).values(input);
    }),
  update: adminProcedure
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
  delete: adminProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(assignments).where(eq(assignments.id, input.id));
    }),
});
