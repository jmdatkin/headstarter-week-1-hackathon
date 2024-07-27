import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { assignmentSubmissionsRouter } from "./routers/assignmentSubmissions";
import { assignmentsRouter } from "./routers/assignments";
import { classesRouter } from "./routers/classes";
import { gradeLevelsRouter } from "./routers/gradeLevels";
import { materialsRouter } from "./routers/materials";
import { quizSubmissionsRouter } from "./routers/quizSubmissions";
import { quizzesRouter } from "./routers/quizzes";
import { readingMaterialViewsRouter } from "./routers/readingMaterialViews";
import { readingMaterialsRouter } from "./routers/readingMaterials";
import { unitsRouter } from "./routers/units";

export const appRouter = createTRPCRouter({
  assignments: assignmentsRouter,
  assignmentSubmissions: assignmentSubmissionsRouter,
  classes: classesRouter,
  gradeLevels: gradeLevelsRouter,
  materials: materialsRouter,
  quizzes: quizzesRouter,
  quizSubmissions: quizSubmissionsRouter,
  readingMaterials: readingMaterialsRouter,
  readingMaterialViews: readingMaterialViewsRouter,
  units: unitsRouter,
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
