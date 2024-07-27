import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  insertReadingMaterialView,
  readingMaterialViews,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const readingMaterialViewsRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(readingMaterialViews);
  }),
  findOne: publicProcedure
    .input(insertReadingMaterialView.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(readingMaterialViews)
        .where(eq(readingMaterialViews.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertReadingMaterialView
        .omit({ id: true })
        .and(insertReadingMaterialView.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(readingMaterialViews)
        .set(input)
        .where(eq(readingMaterialViews.id, input.id));
    }),
  delete: publicProcedure
    .input(insertReadingMaterialView.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(readingMaterialViews)
        .where(eq(readingMaterialViews.id, input.id));
    }),
});
