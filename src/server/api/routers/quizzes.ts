import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { insertQuiz, quizzes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const quizzesRouter = createTRPCRouter({
  findAll: publicProcedure.query(async ({ ctx, input }) => {
    await ctx.db.select().from(quizzes);
  }),
  findOne: publicProcedure
    .input(insertQuiz.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      await ctx.db.select().from(quizzes).where(eq(quizzes.id, input.id));
    }),
  update: publicProcedure
    .input(
      insertQuiz
        .omit({ id: true })
        .and(insertQuiz.pick({ id: true }).required())
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(quizzes).set(input).where(eq(quizzes.id, input.id));
    }),
  delete: publicProcedure
    .input(insertQuiz.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(quizzes).where(eq(quizzes.id, input.id));
    }),
});
