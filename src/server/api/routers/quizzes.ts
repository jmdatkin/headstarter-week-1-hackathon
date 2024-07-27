import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  insertMaterial,
  insertQuiz,
  materials,
  quizzes,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const quizzesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(quizzes)
      .leftJoin(materials, eq(quizzes.materialId, materials.id));
  }),
  findOne: protectedProcedure
    .input(insertQuiz.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(quizzes)
        .leftJoin(materials, eq(quizzes.materialId, materials.id))
        .where(eq(quizzes.id, input.id));
    }),
  create: adminProcedure
    .input(insertQuiz.omit({ id: true }).and(insertMaterial))
    .mutation(async ({ ctx, input }) => {
      const materialsFields: typeof materials.$inferInsert = {
        activeAt: input.activeAt,
        dueAt: input.dueAt,
        unitId: input.unitId,
      };

      const insertResult = await ctx.db
        .insert(materials)
        .values(materialsFields)
        .returning();

      const quizzesFields: typeof quizzes.$inferInsert = {
        content: input.content,
        title: input.title,
        created_at: input.created_at,
        materialId: insertResult[0]!.id,
      };

      await ctx.db.insert(quizzes).values(quizzesFields);
    }),
  update: adminProcedure
    .input(
      insertQuiz
        .omit({ id: true })
        .and(insertQuiz.pick({ id: true }).required())
        .and(insertMaterial)
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(quizzes).set(input).where(eq(quizzes.id, input.id));
      const quizzesFields: Omit<typeof quizzes.$inferInsert, "materialId"> = {
        content: input.content,
        title: input.title,
        created_at: input.created_at,
      };

      const updateResult = await ctx.db
        .update(quizzes)
        .set(quizzesFields)
        .returning()
        .where(eq(quizzes.id, input.id));

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
    .input(insertQuiz.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      const deleteResult = await ctx.db
        .delete(quizzes)
        .returning()
        .where(eq(quizzes.id, input.id));
      await ctx.db
        .delete(materials)
        .where(eq(materials.id, deleteResult[0]!.materialId));
    }),
});
