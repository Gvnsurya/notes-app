import { createServerFn } from "@tanstack/react-start";
import { eq, and, desc } from "drizzle-orm";

import { db } from "../db";
import { notes } from "../db/schema";

// ===============================
// GET NOTES
// ===============================

export const getNotes = createServerFn({
  method: "GET",
})
  .validator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, data.userId))
      .orderBy(
        desc(notes.isPinned),
        desc(notes.createdAt),
      );

    return userNotes;
  });

// ===============================
// CREATE NOTE
// ===============================

export const createNote = createServerFn({
  method: "POST",
})
  .validator(
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
        tag: data.tag,
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
  .validator(
    (data: {
      id: string;
      title: string;
      content: string;
      tag: string;
      userId: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        title: data.title,
        content: data.content,
        tag: data.tag,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(notes.id, data.id),
          eq(notes.userId, data.userId),
        ),
      )
      .returning();

    return updatedNote;
  });

// ===============================
// DELETE NOTE
// ===============================

export const deleteNote = createServerFn({
  method: "POST",
})
  .validator(
    (data: {
      id: string;
      userId: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const deletedNotes = await db
      .delete(notes)
      .where(
        and(
          eq(notes.id, data.id),
          eq(notes.userId, data.userId),
        ),
      )
      .returning();

    return {
      success: deletedNotes.length > 0,
    };
  });

// ===============================
// PIN / UNPIN NOTE
// ===============================

export const togglePinNote = createServerFn({
  method: "POST",
})
  .validator(
    (data: {
      id: string;
      userId: string;
      isPinned: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        isPinned: data.isPinned,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(notes.id, data.id),
          eq(notes.userId, data.userId),
        ),
      )
      .returning();

    return updatedNote;
  });