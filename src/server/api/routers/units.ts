import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertUnit, units } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const unitsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(units);
  }),
  findOne: publicProcedure
    .input(insertUnit.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(units).where(eq(units.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertUnit
        .pick({ name: true })
        .and(insertUnit.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(units)
        .set({
          name: input.name,
        })
        .where(eq(units.id, input.id));
    }),
  delete: publicProcedure
    .input(insertUnit.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(units).where(eq(units.id, input.id));
    }),
});
