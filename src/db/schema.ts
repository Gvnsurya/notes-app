import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: text("title").notNull(),

  content: text("content").notNull(),

  tag: text("tag").notNull().default("PERSONAL"),

  userId: text("user_id").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});