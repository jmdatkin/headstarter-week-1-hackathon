import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  insertMaterial,
  insertReadingMaterial,
  materials,
  readingMaterials,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const readingMaterialsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(readingMaterials)
      .leftJoin(materials, eq(readingMaterials.materialId, materials.id));
  }),
  findOne: protectedProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(readingMaterials)
        .where(eq(readingMaterials.id, input.id))
        .leftJoin(materials, eq(readingMaterials.materialId, materials.id));
    }),
  create: adminProcedure
    .input(insertReadingMaterial.omit({ id: true }).and(insertMaterial))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(readingMaterials).values(input);
      const materialsFields: typeof materials.$inferInsert = {
        activeAt: input.activeAt,
        dueAt: input.dueAt,
        unitId: input.unitId,
      };

      const insertResult = await ctx.db
        .insert(materials)
        .values(materialsFields)
        .returning();

      const readingMaterialsFields: typeof readingMaterials.$inferInsert = {
        content: input.content,
        title: input.title,
        materialId: insertResult[0]!.id,
        holyBook: input.holyBook,
        chapter: input.chapter,
        startVerse: input.startVerse,
        endVerse: input.endVerse,
      };

      await ctx.db.insert(readingMaterials).values(readingMaterialsFields);
    }),
  update: adminProcedure
    .input(
      insertReadingMaterial
        .omit({ id: true })
        .and(insertReadingMaterial.pick({ id: true }).required())
        .and(insertMaterial)
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(readingMaterials)
        .set(input)
        .where(eq(readingMaterials.id, input.id));
      const readingMaterialsFields: Omit<
        typeof readingMaterials.$inferInsert,
        "materialId"
      > = {
        content: input.content,
        title: input.title,
        holyBook: input.holyBook,
        chapter: input.chapter,
        startVerse: input.startVerse,
        endVerse: input.endVerse,
      };

      const updateResult = await ctx.db
        .update(readingMaterials)
        .set(readingMaterialsFields)
        .returning()
        .where(eq(readingMaterials.id, input.id));

      const materialsFields: Omit<typeof materials.$inferInsert, "unitId"> = {
        activeAt: input.activeAt,
        dueAt: input.dueAt,
      };

      await ctx.db
        .update(materials)
        .set(materialsFields)
        .where(eq(materials.id, updateResult[0]!.materialId));
    }),
  delete: adminProcedure
    .input(insertReadingMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      const deleteResult = await ctx.db
        .delete(readingMaterials)
        .returning()
        .where(eq(readingMaterials.id, input.id));

      await ctx.db
        .delete(materials)
        .where(eq(materials.id, deleteResult[0]!.materialId));
    }),
});
