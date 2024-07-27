import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { announcements, insertAnnouncement } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const announcementsRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(announcements);
  }),
  create: adminProcedure
    .input(insertAnnouncement.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(announcements).values(input).returning();
    }),
  update: adminProcedure
    .input(
      insertAnnouncement
        .omit({ id: true })
        .and(insertAnnouncement.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(announcements)
        .set(input)
        .where(eq(announcements.id, input.id));
    }),
  delete: adminProcedure
    .input(insertAnnouncement.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(announcements).where(eq(announcements.id, input.id));
    }),
});
