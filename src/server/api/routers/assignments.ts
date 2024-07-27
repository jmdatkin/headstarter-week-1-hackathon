import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  assignments,
  insertAssignment,
  insertMaterial,
  materials,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const assignmentsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(assignments)
      .leftJoin(materials, eq(assignments.materialId, materials.id));
  }),
  findOne: protectedProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(assignments)
        .where(eq(assignments.id, input.id))
        .leftJoin(materials, eq(assignments.materialId, materials.id));
    }),
  create: adminProcedure
    .input(insertAssignment.omit({ id: true }).and(insertMaterial))
    .mutation(async ({ ctx, input }) => {
      const materialsFields: typeof materials.$inferInsert = {
        activeAt: input.activeAt,
        dueAt: input.dueAt,
        unitId: input.unitId,
      };

      const materialResult = await ctx.db
        .insert(materials)
        .values(materialsFields)
        .returning();

      const assignmentsFields: typeof assignments.$inferInsert = {
        content: input.content,
        title: input.title,
        created_at: input.created_at,
        materialId: materialResult[0]!.id,
      };

      await ctx.db.insert(assignments).values(assignmentsFields);
    }),
  update: adminProcedure
    .input(
      insertAssignment
        .omit({ id: true })
        .and(insertAssignment.pick({ id: true }).required())
        .and(insertMaterial)
    )
    .mutation(async ({ ctx, input }) => {
      const assignmentsFields: Omit<
        typeof assignments.$inferInsert,
        "materialId"
      > = {
        content: input.content,
        title: input.title,
        created_at: input.created_at,
      };

      const updateResult = await ctx.db
        .update(assignments)
        .set(assignmentsFields)
        .returning()
        .where(eq(assignments.id, input.id));

      const materialsFields: typeof materials.$inferInsert = {
        activeAt: input.activeAt,
        dueAt: input.dueAt,
        unitId: input.unitId,
      };

      await ctx.db
        .update(materials)
        .set(materialsFields)
        .where(eq(materials.id, updateResult[0]!.materialId));
    }),
  delete: adminProcedure
    .input(insertAssignment.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(assignments).where(eq(assignments.id, input.id));
    }),
});
