import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  state: text("state").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});