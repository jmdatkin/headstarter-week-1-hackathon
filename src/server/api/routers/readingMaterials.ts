import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertReadingMaterial, readingMaterials } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const readingMaterialsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(readingMaterials);
  }),
  findOne: publicProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(readingMaterials)
        .where(eq(readingMaterials.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertReadingMaterial
        .omit({ id: true })
        .and(insertReadingMaterial.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(readingMaterials)
        .set(input)
        .where(eq(readingMaterials.id, input.id));
    }),
  delete: publicProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(readingMaterials)
        .where(eq(readingMaterials.id, input.id));
    }),
});
