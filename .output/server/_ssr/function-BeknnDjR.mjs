import { n as createServerFn, o as __exportAll, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as pgTable, c as text, i as eq, l as boolean, n as desc, o as uuid, r as and, s as timestamp, t as drizzle } from "../_libs/drizzle-orm.mjs";
import { t as cs } from "../_libs/neondatabase__serverless.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/function-BeknnDjR.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var schema_exports = /* @__PURE__ */ __exportAll({ notes: () => notes });
var notes = pgTable("notes", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	tag: text("tag").notNull().default("PERSONAL"),
	userId: text("user_id").notNull(),
	isPinned: boolean("is_pinned").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var sql = cs(process.env.DATABASE_URL);
var db = drizzle(sql, { schema: schema_exports });
var getNotes_createServerFn_handler = createServerRpc({
	id: "8358b0dd651659d3951a851118d139102d9f900e872c8fc3b795c8525d86d54b",
	name: "getNotes",
	filename: "src/server/function.ts"
}, (opts) => getNotes.__executeServer(opts));
var getNotes = createServerFn({ method: "GET" }).validator((data) => data).handler(getNotes_createServerFn_handler, async ({ data }) => {
	return await db.select().from(notes).where(eq(notes.userId, data.userId)).orderBy(desc(notes.isPinned), desc(notes.createdAt));
});
var createNote_createServerFn_handler = createServerRpc({
	id: "c7949bedc5aa17ffda54f13eb99f7f4a1cc71726c71dc3ec4aef548d0b43f0d6",
	name: "createNote",
	filename: "src/server/function.ts"
}, (opts) => createNote.__executeServer(opts));
var createNote = createServerFn({ method: "POST" }).validator((data) => data).handler(createNote_createServerFn_handler, async ({ data }) => {
	const [newNote] = await db.insert(notes).values({
		title: data.title,
		content: data.content,
		tag: data.tag,
		userId: data.userId
	}).returning();
	return newNote;
});
var updateNote_createServerFn_handler = createServerRpc({
	id: "b44e7185eacee00a8d5b7e278033545ac54ec98dfb277978bc2c6f2e1aaef98c",
	name: "updateNote",
	filename: "src/server/function.ts"
}, (opts) => updateNote.__executeServer(opts));
var updateNote = createServerFn({ method: "POST" }).validator((data) => data).handler(updateNote_createServerFn_handler, async ({ data }) => {
	const [updatedNote] = await db.update(notes).set({
		title: data.title,
		content: data.content,
		tag: data.tag,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(and(eq(notes.id, data.id), eq(notes.userId, data.userId))).returning();
	return updatedNote;
});
var deleteNote_createServerFn_handler = createServerRpc({
	id: "ccdf33c4bb96ba2e62d0542119a685e7893e290687483bf4031e15f3d450e7f6",
	name: "deleteNote",
	filename: "src/server/function.ts"
}, (opts) => deleteNote.__executeServer(opts));
var deleteNote = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteNote_createServerFn_handler, async ({ data }) => {
	return { success: (await db.delete(notes).where(and(eq(notes.id, data.id), eq(notes.userId, data.userId))).returning()).length > 0 };
});
var togglePinNote_createServerFn_handler = createServerRpc({
	id: "726624c0ae0c56ba8f8bde5e4910da4ccaad64913ce9d908f27bde7a7740703a",
	name: "togglePinNote",
	filename: "src/server/function.ts"
}, (opts) => togglePinNote.__executeServer(opts));
var togglePinNote = createServerFn({ method: "POST" }).validator((data) => data).handler(togglePinNote_createServerFn_handler, async ({ data }) => {
	const [updatedNote] = await db.update(notes).set({
		isPinned: data.isPinned,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(and(eq(notes.id, data.id), eq(notes.userId, data.userId))).returning();
	return updatedNote;
});
//#endregion
export { createNote_createServerFn_handler, deleteNote_createServerFn_handler, getNotes_createServerFn_handler, togglePinNote_createServerFn_handler, updateNote_createServerFn_handler };
