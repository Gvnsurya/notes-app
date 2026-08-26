import { createServerFn } from "@tanstack/react-start";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { notes } from "../db/schema";

// ===============================
// GET NOTES
// ===============================

export const getNotes = createServerFn({
  method: "GET",
})
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, data.userId))
      .orderBy(desc(notes.createdAt));

    return userNotes;
  });

// ===============================
// CREATE NOTE
// ===============================

export const createNote = createServerFn({
  method: "POST",
})
  .inputValidator(
    (data: {
      title: string;
      content: string;
      tag: string;
      userId: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const [newNote] = await db
      .insert(notes)
      .values({
        title: data.title,
        content: data.content,
        tag: data.tag as "PERSONAL" | "WORK" | "STUDY",
        userId: data.userId,
      })
      .returning();

    return newNote;
  });

// ===============================
// UPDATE NOTE
// ===============================

export const updateNote = createServerFn({
  method: "POST",
})
  .inputValidator(
    (data: {
      id: string;
      title: string;
      content: string;
      tag: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        title: data.title,
        content: data.content,
        tag: data.tag as "PERSONAL" | "WORK" | "STUDY",
      })
      .where(eq(notes.id, data.id))
      .returning();

    return updatedNote;
  });

// ===============================
// DELETE NOTE
// ===============================

export const deleteNote = createServerFn({
  method: "POST",
})
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(notes).where(eq(notes.id, data.id));

    return {
      success: true,
    };
  });