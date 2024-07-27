import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { insertMaterial, homeworks, insertHomework } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const homeworksRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.select().from(homeworks);
  }),
  findOne: protectedProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(homeworks).where(eq(homeworks.id, input.id)).then(x => x.at(0) ?? null);
    }),
  create: adminProcedure
    .input(insertHomework.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(homeworks).values(input);
    }),
  delete: adminProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(homeworks).where(eq(homeworks.id, input.id));
    }),
});
