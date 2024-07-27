import { sql } from "drizzle-orm/sql";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const date = (name: string) => integer(name, { mode: "timestamp" });
const id = text("id").primaryKey().$defaultFn(nanoid);
const created_at = date("created_at").notNull().$defaultFn(() => new Date());
const sqlNull = sql`NULL`;

export const users = sqliteTable("user", {
  id,
  email: text("email").notNull(),
  username: text("username").notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  created_at,
});
export type User = typeof users.$inferSelect;
export const insertUser = createInsertSchema(users);
export const selectUser = createSelectSchema(users);

export const assignments = sqliteTable("assignment", {
  id,
  workspace_id: text("workspace_id").notNull(),
  creator_id: text("creator_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  due_at: date("due_at").notNull(),
  created_at,
});
export type Assignment = typeof assignments.$inferSelect;
export const insertAssignment = createInsertSchema(assignments);
export const selectAssignment = createSelectSchema(assignments);

export const workspaceMembers = sqliteTable("workspace_member", {
  workspace_id: text("workspace_id").notNull(),
  user_id: text("user_id").notNull(),
  role: text("role").notNull(),
  created_at,
});
export type WorkspaceMember = typeof workspaceMembers.$inferSelect;
export const insertWorkspaceMember = createInsertSchema(workspaceMembers);
export const selectWorkspaceMember = createSelectSchema(workspaceMembers);