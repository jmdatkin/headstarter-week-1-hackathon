import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

const date = (name: string) => integer(name, { mode: "timestamp" });
const id = text("id").primaryKey().$defaultFn(nanoid);
const created_at = date("created_at")
  .notNull()
  .$defaultFn(() => new Date());
const sqlNull = sql`NULL`;

/**
 * Grade levels
 */
export const gradeLevels = sqliteTable("grade_levels", {
  id,
  name: text("name").default(""),
});
export type GradeLevels = typeof gradeLevels.$inferSelect;
export const insertGradeLevel = createInsertSchema(gradeLevels);
export const selectGradeLevel = createSelectSchema(gradeLevels);

export const gradeLevelRelations = relations(gradeLevels, ({ many }) => ({
  classes: many(classes),
}));

/**
 * Classes
 */
export const classes = sqliteTable("classes", {
  id,
  gradeLevelId: text("grade_level_id").notNull(),
  orgId: text("org_id"),
  name: text("name").default(""),
});
export type Classes = typeof classes.$inferSelect;
export const insertClass = createInsertSchema(classes);
export const selectClass = createSelectSchema(classes);

export const classRelations = relations(classes, ({ many, one }) => ({
  gradeLevel: one(gradeLevels, {
    fields: [classes.gradeLevelId],
    references: [gradeLevels.id],
  }),
  units: many(units),
  announcements: many(announcements),
}));

/**
 * Units
 */
export const units = sqliteTable("units", {
  id,
  classId: text("class_id").notNull(),
  name: text("name").default(""),
});
export type Units = typeof units.$inferSelect;
export const insertUnit = createInsertSchema(units);
export const selectUnit = createSelectSchema(units);

export const unitRelations = relations(units, ({ many, one }) => ({
  class: one(classes, {
    fields: [units.classId],
    references: [classes.id],
  }),
  materials: many(materials),
}));

/**
 * Announcements
 */
export const announcements = sqliteTable("announcements", {
  id,
  classId: text("class_id").notNull(),
  title: text("title").notNull(),
  text: text("text").notNull(),
});
export type Announcements = typeof announcements.$inferSelect;
export const insertAnnouncement = createInsertSchema(announcements);
export const selectAnnouncement = createSelectSchema(announcements);

export const announcementRelations = relations(announcements, ({ one }) => ({
  class: one(classes, {
    fields: [announcements.classId],
    references: [classes.id],
  }),
}));

/**
 * Materials
 */
export const materials = sqliteTable("materials", {
  id,
  activeAt: date("active_at").notNull(),
  dueAt: date("due_at").notNull(),
  unitId: text("unit_id").notNull(),
});
export type Material = typeof materials.$inferSelect;
export const insertMaterial = createInsertSchema(materials);
export const selectMaterial = createSelectSchema(materials);

export const materialRelations = relations(materials, ({ one }) => ({
  unit: one(units, {
    fields: [materials.unitId],
    references: [units.id],
  }),
}));

/**
 * Reading materials
 */
export const readingMaterials = sqliteTable("reading_materials", {
  id,
  title: text("title").notNull(),
  materialId: text("material_id").notNull(),
  content: text("content"),
  holyBook: text("holy_book").notNull(),
  chapter: text("chapter").notNull(),
  startVerse: text("start_verse").notNull(),
  endVerse: text("end_verse").notNull(),
  created_at,
});
export type ReadingMaterial = typeof readingMaterials.$inferSelect;
export const insertReadingMaterial = createInsertSchema(readingMaterials);
export const selectReadingMaterial = createSelectSchema(readingMaterials);

export const readingMaterialRelations = relations(
  readingMaterials,
  ({ many, one }) => ({
    material: one(materials, {
      fields: [readingMaterials.materialId],
      references: [materials.id],
    }),
    views: many(readingMaterialViews),
  })
);

/**
 * Reading material views
 */
export const readingMaterialViews = sqliteTable("reading_material_views", {
  id,
  readingMaterialId: text("reading_material_id").notNull(),
  userId: text("user_id").notNull(),
  viewedAt: date("submitted_at").notNull(),
});
export type ReadingMaterialView = typeof readingMaterialViews.$inferSelect;
export const insertReadingMaterialView =
  createInsertSchema(readingMaterialViews);
export const selectReadingMaterialView =
  createSelectSchema(readingMaterialViews);

export const readingMaterialViewRelations = relations(
  readingMaterialViews,
  ({ one }) => ({
    readingMaterial: one(readingMaterials, {
      fields: [readingMaterialViews.readingMaterialId],
      references: [readingMaterials.id],
    }),
  })
);

/**
 * Homework
 */
export const homeworks = sqliteTable("homework", {
  id,
  materialId: text("material_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  questions: text("questions", { mode: "json" }).notNull(),
  created_at,
});
export type Homework = typeof homeworks.$inferSelect;
export const insertHomework = createInsertSchema(homeworks);
export const selectHomework = createSelectSchema(homeworks);

export const homeworkRelations = relations(homeworks, ({ one }) => ({
  material: one(materials, {
    fields: [homeworks.materialId],
    references: [materials.id],
  }),
}));

/**
 * Homework submissions
 */
export const homeworkSubmissions = sqliteTable("assignment_submissions", {
  id,
  homeworkId: text("homework_id").notNull(),
  userId: text("user_id").notNull(),
  answers: text("answers", { mode: "json" }).notNull(),
  score: text("score").notNull(),
  submittedAt: date("submitted_at").notNull(),
});
export type HomeworkSubmission = typeof homeworkSubmissions.$inferSelect;
export const insertHomeworkSubmission = createInsertSchema(homeworkSubmissions);
export const selectHomeworkSubmission = createSelectSchema(homeworkSubmissions);

export const homeworkSubmissionRelations = relations(
  homeworkSubmissions,
  ({ one }) => ({
    homework: one(homeworks, {
      fields: [homeworkSubmissions.homeworkId],
      references: [homeworks.id],
    }),
  })
);
