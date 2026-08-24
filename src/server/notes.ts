import { eq, desc } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { db } from "../db";
import { notes } from "../db/schema";

// Get all notes
export async function getNotes() {
  return await db
    .select()
    .from(notes)
    .orderBy(desc(notes.createdAt));
}

// Get one note
export async function getNote(id: string) {
  const result = await db
    .select()
    .from(notes)
    .where(eq(notes.id, id))
    .limit(1);

  return result[0] ?? null;
}

// Create a note
export async function createNote(
  title: string,
  body: string,
  tag: "PERSONAL" | "WORK" | "IDEA" = "PERSONAL",
) {
  const result = await db
  .insert(notes)
  .values({
    id: randomUUID(),
    title,
    body,
    tag,
  })
  .returning();

  return result[0];
}

// Update a note
export async function updateNote(
  id: string,
  title: string,
  body: string,
  tag: "PERSONAL" | "WORK" | "IDEA",
) {
  const result = await db
    .update(notes)
    .set({
      title,
      body,
      tag,
      updatedAt: new Date(),
    })
    .where(eq(notes.id, id))
    .returning();

  return result[0] ?? null;
}

// Delete a note
export async function deleteNote(id: string) {
  const result = await db
    .delete(notes)
    .where(eq(notes.id, id))
    .returning();

  return result[0] ?? null;
}