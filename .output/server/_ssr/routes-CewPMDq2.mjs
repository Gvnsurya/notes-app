import { o as __toESM } from "../_runtime.mjs";
import { L as require_react, _ as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { t as authClient } from "./auth-client-DzneXuQ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CewPMDq2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getNotes = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("8358b0dd651659d3951a851118d139102d9f900e872c8fc3b795c8525d86d54b"));
var createNote = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c7949bedc5aa17ffda54f13eb99f7f4a1cc71726c71dc3ec4aef548d0b43f0d6"));
var updateNote = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b44e7185eacee00a8d5b7e278033545ac54ec98dfb277978bc2c6f2e1aaef98c"));
var deleteNote = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ccdf33c4bb96ba2e62d0542119a685e7893e290687483bf4031e15f3d450e7f6"));
var togglePinNote = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("726624c0ae0c56ba8f8bde5e4910da4ccaad64913ce9d908f27bde7a7740703a"));
function NotesPage() {
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [tag, setTag] = (0, import_react.useState)("PERSONAL");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("ALL");
	const [sortBy, setSortBy] = (0, import_react.useState)("NEWEST");
	const { data: session } = authClient.useSession();
	(0, import_react.useEffect)(() => {
		if (session?.user?.id) loadNotes();
		else {
			setNotes([]);
			setLoading(false);
		}
	}, [session?.user?.id]);
	async function loadNotes() {
		if (!session?.user?.id) return;
		try {
			setLoading(true);
			const result = await getNotes({ data: { userId: session.user.id } });
			setNotes(result);
		} catch (error) {
			console.error("Failed to load notes:", error);
			alert("Failed to load notes");
		} finally {
			setLoading(false);
		}
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (!session?.user?.id) {
			alert("Please log in first");
			return;
		}
		if (!title.trim() || !content.trim()) {
			alert("Title and content are required");
			return;
		}
		try {
			if (editingId) {
				await updateNote({ data: {
					id: editingId,
					title: title.trim(),
					content: content.trim(),
					tag,
					userId: session.user.id
				} });
				setEditingId(null);
			} else await createNote({ data: {
				title: title.trim(),
				content: content.trim(),
				tag,
				userId: session.user.id
			} });
			setTitle("");
			setContent("");
			setTag("PERSONAL");
			await loadNotes();
		} catch (error) {
			console.error("Failed to save note:", error);
			alert("Failed to save note");
		}
	}
	function handleEdit(note) {
		setEditingId(note.id);
		setTitle(note.title);
		setContent(note.content);
		setTag(note.tag);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	async function handleDelete(id) {
		if (!session?.user?.id) return;
		if (!window.confirm("Are you sure you want to delete this note?")) return;
		try {
			await deleteNote({ data: {
				id,
				userId: session.user.id
			} });
			await loadNotes();
		} catch (error) {
			console.error("Failed to delete note:", error);
			alert("Failed to delete note");
		}
	}
	async function handlePin(note) {
		if (!session?.user?.id) return;
		try {
			await togglePinNote({ data: {
				id: note.id,
				userId: session.user.id,
				isPinned: !note.isPinned
			} });
			await loadNotes();
		} catch (error) {
			console.error("Failed to update pin:", error);
			alert("Failed to update note");
		}
	}
	function handleCancelEdit() {
		setEditingId(null);
		setTitle("");
		setContent("");
		setTag("PERSONAL");
	}
	async function handleLogout() {
		await authClient.signOut();
		window.location.href = "/login";
	}
	const filteredNotes = (0, import_react.useMemo)(() => {
		let result = [...notes];
		if (activeFilter !== "ALL") result = result.filter((note) => note.tag === activeFilter);
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter((note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query));
		}
		result.sort((a, b) => {
			if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
			switch (sortBy) {
				case "NEWEST": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
				case "OLDEST": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
				case "TITLE_ASC": return a.title.localeCompare(b.title, void 0, { sensitivity: "base" });
				case "TITLE_DESC": return b.title.localeCompare(a.title, void 0, { sensitivity: "base" });
				default: return 0;
			}
		});
		return result;
	}, [
		notes,
		activeFilter,
		searchQuery,
		sortBy
	]);
	if (!session && !loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "notes-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-required",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "login-required-icon",
					children: "🔒"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Welcome to My Notes" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Please log in to access your notes." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary-btn",
					onClick: () => {
						window.location.href = "/login";
					},
					children: "Go to Login →"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "notes-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "background-orb orb-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "background-orb orb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "background-orb orb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "notes-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "notes-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "brand-icon",
								children: "✦"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "My Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Organize your thoughts beautifully" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "user-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "user-info",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "user-avatar",
									children: session?.user?.name?.charAt(0).toUpperCase() || "U"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "user-email",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Welcome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: session?.user?.name || "User" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "logout-btn",
								onClick: handleLogout,
								children: "Logout"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "note-form-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-label",
								children: editingId ? "EDITING NOTE" : "NEW NOTE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: editingId ? "Update your thought" : "What's on your mind?" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-icon",
								children: editingId ? "✎" : "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Give your note a title...",
										value: title,
										onChange: (e) => setTitle(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Content" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										placeholder: "Write down your thoughts...",
										value: content,
										onChange: (e) => setContent(e.target.value),
										rows: 7
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "form-footer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "input-group tag-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: tag,
											onChange: (e) => setTag(e.target.value),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "PERSONAL",
													children: "🌿 Personal"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "WORK",
													children: "💼 Work"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "STUDY",
													children: "📚 Study"
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-actions",
										children: [editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "cancel-btn",
											onClick: handleCancelEdit,
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											className: "primary-btn",
											children: [editingId ? "Update Note" : "Add Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "notes-filter-section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "search-box",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search your notes...",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "filter-buttons",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: activeFilter === "ALL" ? "filter-btn active" : "filter-btn",
										onClick: () => setActiveFilter("ALL"),
										children: "All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: activeFilter === "PERSONAL" ? "filter-btn active" : "filter-btn",
										onClick: () => setActiveFilter("PERSONAL"),
										children: "🌿 Personal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: activeFilter === "WORK" ? "filter-btn active" : "filter-btn",
										onClick: () => setActiveFilter("WORK"),
										children: "💼 Work"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: activeFilter === "STUDY" ? "filter-btn active" : "filter-btn",
										onClick: () => setActiveFilter("STUDY"),
										children: "📚 Study"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sort-container",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "sort-notes",
									children: "Sort by"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "sort-notes",
									className: "sort-select",
									value: sortBy,
									onChange: (e) => setSortBy(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "NEWEST",
											children: "Newest First"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "OLDEST",
											children: "Oldest First"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "TITLE_ASC",
											children: "Title A → Z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "TITLE_DESC",
											children: "Title Z → A"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "notes-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "notes-section-header",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "section-label",
								children: "YOUR COLLECTION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your Notes" })] }), !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "notes-count",
								children: [
									filteredNotes.length,
									" ",
									filteredNotes.length === 1 ? "Note" : "Notes"
								]
							})]
						}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-state",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading your notes..." })]
						}) : filteredNotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-icon",
									children: "✦"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No notes found" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: searchQuery ? "Try a different search." : activeFilter !== "ALL" ? "There are no notes in this category yet." : "Create your first note and keep your ideas organized." })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "notes-grid",
							children: filteredNotes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `note-card ${note.isPinned ? "pinned-note" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "note-card-top",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `note-tag ${note.tag.toLowerCase()}`,
											children: note.tag
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "note-actions",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "pin-btn",
													onClick: () => handlePin(note),
													title: note.isPinned ? "Unpin note" : "Pin note",
													children: note.isPinned ? "📌" : "📍"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "edit-btn",
													onClick: () => handleEdit(note),
													title: "Edit note",
													children: "✎"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													className: "delete-btn",
													onClick: () => handleDelete(note.id),
													title: "Delete note",
													children: "×"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: note.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: note.content }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "note-card-footer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: note.isPinned ? "📌 Pinned note" : "✦ Saved note" })
									})
								]
							}, note.id))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { NotesPage as component };
