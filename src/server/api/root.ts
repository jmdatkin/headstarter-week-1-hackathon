import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { classesRouter } from "./routers/classes";
import { gradeLevelsRouter } from "./routers/gradeLevels";
import { materialsRouter } from "./routers/materials";
import { readingMaterialViewsRouter } from "./routers/readingMaterialViews";
import { readingMaterialsRouter } from "./routers/readingMaterials";
import { unitsRouter } from "./routers/units";
import { homeworksRouter } from "./routers/homework";
import { announcementsRouter } from "./routers/announcements";
import { homeworkSubmissionsRouter } from "./routers/homeworkSubmissions";

export const appRouter = createTRPCRouter({
  classes: classesRouter,
  announcements: announcementsRouter,
  gradeLevels: gradeLevelsRouter,
  materials: materialsRouter,
  readingMaterials: readingMaterialsRouter,
  readingMaterialViews: readingMaterialViewsRouter,
  units: unitsRouter,
  homeworks: homeworksRouter,
  homeworkSubmissions: homeworkSubmissionsRouter
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
