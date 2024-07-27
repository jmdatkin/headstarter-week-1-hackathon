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