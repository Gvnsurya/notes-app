import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "../lib/auth-client";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  togglePinNote,
} from "../server/function";

export const Route = createFileRoute("/")({
  component: NotesPage,
});

type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  userId: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FilterType = "ALL" | "PERSONAL" | "WORK" | "STUDY";

type SortType =
  | "NEWEST"
  | "OLDEST"
  | "TITLE_ASC"
  | "TITLE_DESC";

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("PERSONAL");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  // SEARCH + FILTER + SORT
  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("ALL");

  const [sortBy, setSortBy] =
    useState<SortType>("NEWEST");

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.id) {
      loadNotes();
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [session?.user?.id]);

  async function loadNotes() {
    if (!session?.user?.id) return;

    try {
      setLoading(true);

      const result = await getNotes({
        data: {
          userId: session.user.id,
        },
      });

      setNotes(result as Note[]);
    } catch (error) {
      console.error("Failed to load notes:", error);
      alert("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
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
        await updateNote({
          data: {
            id: editingId,
            title: title.trim(),
            content: content.trim(),
            tag,
            userId: session.user.id,
          },
        });

        setEditingId(null);
      } else {
        await createNote({
          data: {
            title: title.trim(),
            content: content.trim(),
            tag,
            userId: session.user.id,
          },
        });
      }

      setTitle("");
      setContent("");
      setTag("PERSONAL");

      await loadNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note");
    }
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);

    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: string) {
    if (!session?.user?.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmed) return;

    try {
      await deleteNote({
        data: {
          id,
          userId: session.user.id,
        },
      });

      await loadNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note");
    }
  }

  async function handlePin(note: Note) {
    if (!session?.user?.id) return;

    try {
      await togglePinNote({
        data: {
          id: note.id,
          userId: session.user.id,
          isPinned: !note.isPinned,
        },
      });

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

  // ===============================
  // FILTER + SEARCH + SORT
  // ===============================

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // CATEGORY FILTER
    if (activeFilter !== "ALL") {
      result = result.filter(
        (note) => note.tag === activeFilter,
      );
    }

    // SEARCH FILTER
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query),
      );
    }

    // SORT NOTES
    result.sort((a, b) => {
      // PINNED NOTES ALWAYS FIRST
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }

      switch (sortBy) {
        case "NEWEST":
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );

        case "OLDEST":
          return (
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
          );

        case "TITLE_ASC":
          return a.title.localeCompare(
            b.title,
            undefined,
            {
              sensitivity: "base",
            },
          );

        case "TITLE_DESC":
          return b.title.localeCompare(
            a.title,
            undefined,
            {
              sensitivity: "base",
            },
          );

        default:
          return 0;
      }
    });

    return result;
  }, [
    notes,
    activeFilter,
    searchQuery,
    sortBy,
  ]);

  if (!session && !loading) {
    return (
      <main className="notes-page">
        <div className="login-required">
          <div className="login-required-icon">
            🔒
          </div>

          <h1>Welcome to My Notes</h1>

          <p>Please log in to access your notes.</p>

          <button
            className="primary-btn"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Go to Login →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="notes-page">
      <div className="background-orb orb-1"></div>
      <div className="background-orb orb-2"></div>
      <div className="background-orb orb-3"></div>

      <div className="notes-container">

        {/* HEADER */}

        <header className="notes-header">
          <div className="brand">
            <div className="brand-icon">✦</div>

            <div>
              <h1>My Notes</h1>

              <p>
                Organize your thoughts beautifully
              </p>
            </div>
          </div>

          <div className="user-section">
            <div className="user-info">
              <span className="user-avatar">
                {session?.user?.name
                  ?.charAt(0)
                  .toUpperCase() || "U"}
              </span>

              <div className="user-email">
                <span>Welcome</span>

                <strong>
                  {session?.user?.name || "User"}
                </strong>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* NOTE FORM */}

        <section className="note-form-card">
          <div className="form-header">
            <div>
              <span className="section-label">
                {editingId
                  ? "EDITING NOTE"
                  : "NEW NOTE"}
              </span>

              <h2>
                {editingId
                  ? "Update your thought"
                  : "What's on your mind?"}
              </h2>
            </div>

            <div className="form-icon">
              {editingId ? "✎" : "+"}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Title</label>

              <input
                type="text"
                placeholder="Give your note a title..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <label>Content</label>

              <textarea
                placeholder="Write down your thoughts..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                rows={7}
              />
            </div>

            <div className="form-footer">
              <div className="input-group tag-group">
                <label>Category</label>

                <select
                  value={tag}
                  onChange={(e) =>
                    setTag(e.target.value)
                  }
                >
                  <option value="PERSONAL">
                    🌿 Personal
                  </option>

                  <option value="WORK">
                    💼 Work
                  </option>

                  <option value="STUDY">
                    📚 Study
                  </option>
                </select>
              </div>

              <div className="form-actions">
                {editingId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingId
                    ? "Update Note"
                    : "Add Note"}

                  <span>→</span>
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* SEARCH + FILTER + SORT SECTION */}

        <section className="notes-filter-section">

          {/* SEARCH */}

          <div className="search-box">
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>

          {/* CATEGORY FILTERS */}

          <div className="filter-buttons">

            <button
              className={
                activeFilter === "ALL"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setActiveFilter("ALL")
              }
            >
              All
            </button>

            <button
              className={
                activeFilter === "PERSONAL"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setActiveFilter("PERSONAL")
              }
            >
              🌿 Personal
            </button>

            <button
              className={
                activeFilter === "WORK"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setActiveFilter("WORK")
              }
            >
              💼 Work
            </button>

            <button
              className={
                activeFilter === "STUDY"
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setActiveFilter("STUDY")
              }
            >
              📚 Study
            </button>

          </div>

          {/* SORT */}

          <div className="sort-container">
            <label htmlFor="sort-notes">
              Sort by
            </label>

            <select
              id="sort-notes"
              className="sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as SortType,
                )
              }
            >
              <option value="NEWEST">
                Newest First
              </option>

              <option value="OLDEST">
                Oldest First
              </option>

              <option value="TITLE_ASC">
                Title A → Z
              </option>

              <option value="TITLE_DESC">
                Title Z → A
              </option>
            </select>
          </div>

        </section>

        {/* NOTES SECTION */}

        <section className="notes-section">

          <div className="notes-section-header">
            <div>
              <span className="section-label">
                YOUR COLLECTION
              </span>

              <h2>Your Notes</h2>
            </div>

            {!loading && (
              <div className="notes-count">
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1
                  ? "Note"
                  : "Notes"}
              </div>
            )}
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="loader"></div>

              <p>Loading your notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                ✦
              </div>

              <h3>No notes found</h3>

              <p>
                {searchQuery
                  ? "Try a different search."
                  : activeFilter !== "ALL"
                    ? "There are no notes in this category yet."
                    : "Create your first note and keep your ideas organized."}
              </p>
            </div>
          ) : (
            <div className="notes-grid">

              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className={`note-card ${
                    note.isPinned
                      ? "pinned-note"
                      : ""
                  }`}
                >

                  <div className="note-card-top">

                    <span
                      className={`note-tag ${note.tag.toLowerCase()}`}
                    >
                      {note.tag}
                    </span>

                    <div className="note-actions">

                      {/* PIN */}

                      <button
                        className="pin-btn"
                        onClick={() =>
                          handlePin(note)
                        }
                        title={
                          note.isPinned
                            ? "Unpin note"
                            : "Pin note"
                        }
                      >
                        {note.isPinned
                          ? "📌"
                          : "📍"}
                      </button>

                      {/* EDIT */}

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(note)
                        }
                        title="Edit note"
                      >
                        ✎
                      </button>

                      {/* DELETE */}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(note.id)
                        }
                        title="Delete note"
                      >
                        ×
                      </button>

                    </div>
                  </div>

                  <h3>{note.title}</h3>

                  <p>{note.content}</p>

                  <div className="note-card-footer">
                    <span>
                      {note.isPinned
                        ? "📌 Pinned note"
                        : "✦ Saved note"}
                    </span>
                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}