import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { gradeLevels, insertGradeLevel } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const gradeLevelsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(gradeLevels);
  }),
  findOne: publicProcedure
    .input(insertGradeLevel.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(gradeLevels)
        .where(eq(gradeLevels.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertGradeLevel
        .omit({ id: true })
        .and(insertGradeLevel.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(gradeLevels)
        .set(input)
        .where(eq(gradeLevels.id, input.id));
    }),
  delete: publicProcedure
    .input(insertGradeLevel.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(gradeLevels).where(eq(gradeLevels.id, input.id));
    }),
});
