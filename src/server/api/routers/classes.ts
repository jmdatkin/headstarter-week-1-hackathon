import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { classes, insertClass } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const classesRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(classes);
  }),
  findOne: publicProcedure
    .input(insertClass.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(classes).where(eq(classes.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertClass
        .pick({ name: true })
        .and(insertClass.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(classes)
        .set({
          name: input.name,
        })
        .where(eq(classes.id, input.id));
    }),
  delete: publicProcedure
    .input(insertClass.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(classes).where(eq(classes.id, input.id));
    }),
});
