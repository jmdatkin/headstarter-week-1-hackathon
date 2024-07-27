import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertMaterial, materials } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const materialsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(materials);
  }),
  findOne: publicProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(materials).where(eq(materials.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertMaterial
        .omit({ id: true })
        .and(insertMaterial.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(materials)
        .set({
          activeAt: input.activeAt,
          dueAt: input.dueAt,
        })
        .where(eq(materials.id, input.id));
    }),
  delete: publicProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(materials).where(eq(materials.id, input.id));
    }),
});
