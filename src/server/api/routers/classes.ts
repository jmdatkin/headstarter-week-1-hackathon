import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { announcements, classes, insertAnnouncement, insertClass } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const classesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(classes);
  }),
  findOne: protectedProcedure
    .input(insertClass.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(classes).where(eq(classes.id, input.id));
    }),
  create: adminProcedure
    .input(insertClass.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(classes).values({
        ...input,
        orgId: ctx.auth.orgId,
      });
    }),
  update: adminProcedure
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
  delete: adminProcedure
    .input(insertClass.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(classes).where(eq(classes.id, input.id));
    }),
  createAnnouncement: adminProcedure
    .input(insertAnnouncement.pick({ classId: true, title: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(announcements).values(input);
    }),
});
