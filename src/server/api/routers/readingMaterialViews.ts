import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  insertReadingMaterialView,
  readingMaterialViews,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const readingMaterialViewsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(readingMaterialViews);
  }),
  findOne: protectedProcedure
    .input(insertReadingMaterialView.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db
        .select()
        .from(readingMaterialViews)
        .where(eq(readingMaterialViews.id, input.id));
    }),
  findForUser: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db
      .select()
      .from(readingMaterialViews)
      .where(eq(readingMaterialViews.userId, ctx.auth.userId!));
  }),
  create: protectedProcedure
    .input(insertReadingMaterialView.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(readingMaterialViews).values({
        ...input,
        userId: ctx.auth.userId!,
      });
    }),
});
