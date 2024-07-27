import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const conn = new Database("database.db");
export const db = drizzle(conn, { schema });
