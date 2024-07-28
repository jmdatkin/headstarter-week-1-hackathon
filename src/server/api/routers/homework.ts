import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { homeworks, insertHomework, insertMaterial } from "@/server/db/schema";
import {
  getListObjects,
  getObjectPresignedUrl,
  getPutPresignedUrl,
} from "@/server/s3";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const homeworksRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.select().from(homeworks);
  }),
  findOne: protectedProcedure
    .input(insertMaterial.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(homeworks)
        .where(eq(homeworks.id, input.id))
        .then((x) => x.at(0) ?? null);
    }),
  getPutObjectPresignedUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string().optional(),
        mimetype: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getPutPresignedUrl(input.filename, input.mimetype);
    }),
  getObjectPresignedUrl: protectedProcedure
    .input(
      z.object({
        filename: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await getObjectPresignedUrl(input.filename);
    }),
  listAssets: protectedProcedure.query(async ({ ctx, input }) => {
    return await getListObjects();
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
