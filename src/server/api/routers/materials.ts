import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { insertMaterial, materials } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const materialsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(materials);
  }),
  findOne: protectedProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(materials).where(eq(materials.id, input.id));
    }),
  create: adminProcedure
    .input(insertMaterial.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(materials).values(input);
    }),
  update: adminProcedure
    .input(
      insertMaterial
        .omit({ id: true })
        .and(insertMaterial.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(materials)
        .set({
          activeAt: input.activeAt,
          dueAt: input.dueAt,
        })
        .where(eq(materials.id, input.id));
    }),
  delete: adminProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(materials).where(eq(materials.id, input.id));
    }),
});
