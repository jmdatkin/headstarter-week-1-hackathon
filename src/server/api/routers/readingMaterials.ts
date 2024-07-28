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
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({ "apiKey": process.env.OPENAPI_KEY! });

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
      return await ctx.db
        .select()
        .from(readingMaterials)
        .where(eq(readingMaterials.id, input.id))
        .leftJoin(materials, eq(readingMaterials.materialId, materials.id)).then(x => x.at(0));
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

      return (await ctx.db.insert(readingMaterials).values(readingMaterialsFields).returning()).at(0);
    }),
  getSimplified: protectedProcedure
    .input(z.object({
      content: z.string()
    }))
    .query(async (opts) => {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "The following is a conversation regarding religious holy text. You are an expert on holy books such as the Quran and the Bible. You will be given text to simplify, and you are intended to only give a condensed, yet accurate simplification or explanation of the verses given. You are not allowed to make verses of your own or deviate from what the text intends to say." },
          { role: "user", content: opts.input.content },
        ],
      });

      return response.choices[0]?.message?.content;
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
