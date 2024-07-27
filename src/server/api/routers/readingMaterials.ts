import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { insertReadingMaterial, readingMaterials } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const readingMaterialsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(readingMaterials);
  }),
  findOne: protectedProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(readingMaterials)
        .where(eq(readingMaterials.id, input.id));
    }),
  create: adminProcedure
    .input(insertReadingMaterial.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(readingMaterials).values(input);
    }),
  update: adminProcedure
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
  delete: adminProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(readingMaterials)
        .where(eq(readingMaterials.id, input.id));
    }),
});
