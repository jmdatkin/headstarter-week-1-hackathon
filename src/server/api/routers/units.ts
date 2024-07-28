import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { insertUnit, units } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const unitsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.select().from(units);
  }),
  findOne: protectedProcedure
    .input(insertUnit.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(units).where(eq(units.id, input.id));
    }),
  create: adminProcedure
    .input(insertUnit.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(units).values(input);
    }),
  update: adminProcedure
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
  delete: adminProcedure
    .input(insertUnit.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(units).where(eq(units.id, input.id));
    }),
});
