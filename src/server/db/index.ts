// import { drizzle } from "drizzle-orm/better-sqlite3";
import { drizzle } from "drizzle-orm/libsql";
// import Database from "better-sqlite3";
import * as schema from "./schema";
import { createClient } from '@libsql/client';

// const conn = new Database("database.db");
const client = createClient({
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client, { schema });
