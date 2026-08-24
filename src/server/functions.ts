import { createServerFn } from "@tanstack/react-start";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "./notes";

export const getNotesFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return await getNotes();
});

export const getNoteFn = createServerFn({
  method: "GET",
})
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return await getNote(data.id);
  });

export const createNoteFn = createServerFn({
  method: "POST",
})
  .validator(
    (data: {
      title: string;
      body: string;
      tag: "PERSONAL" | "WORK" | "IDEA";
    }) => data,
  )
  .handler(async ({ data }) => {
    return await createNote(data.title, data.body, data.tag);
  });

export const updateNoteFn = createServerFn({
  method: "POST",
})
  .validator(
    (data: {
      id: string;
      title: string;
      body: string;
      tag: "PERSONAL" | "WORK" | "IDEA";
    }) => data,
  )
  .handler(async ({ data }) => {
    return await updateNote(
      data.id,
      data.title,
      data.body,
      data.tag,
    );
  });

export const deleteNoteFn = createServerFn({
  method: "POST",
})
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return await deleteNote(data.id);
  });