import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { insertQuiz, quizzes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const quizzesRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(quizzes);
  }),
  findOne: protectedProcedure
    .input(insertQuiz.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(quizzes).where(eq(quizzes.id, input.id));
    }),
  create: adminProcedure
    .input(insertQuiz.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(quizzes).values(input);
    }),
  update: adminProcedure
    .input(
      insertQuiz
        .omit({ id: true })
        .and(insertQuiz.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(quizzes).set(input).where(eq(quizzes.id, input.id));
    }),
  delete: adminProcedure
    .input(insertQuiz.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(quizzes).where(eq(quizzes.id, input.id));
    }),
});
