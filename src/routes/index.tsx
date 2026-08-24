import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  getNotesFn,
  createNoteFn,
  updateNoteFn,
  deleteNoteFn,
} from "../server/functions";

export const Route = createFileRoute('/')({
  component: Home,
})

type Tag = 'PERSONAL' | 'WORK' | 'IDEA'

type Note = {
  id: string
  title: string
  body: string
  tag: Tag
  createdAt: Date | string
  updatedAt: Date | string
}

function Home() {
  const router = useRouter()

  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState<Tag>('PERSONAL')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load notes
  const loadNotes = async () => {
  try {
    setLoading(true)

    const result = await getNotesFn()

    setNotes(result as Note[])
  } catch (error) {
    console.error("Failed to load notes:", error)
    alert("Failed to load notes")
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    loadNotes()
  }, [])

  // Clear form
  const clearForm = () => {
    setTitle('')
    setBody('')
    setTag('PERSONAL')
    setEditingId(null)
  }

  // Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !body.trim()) {
      alert('Please enter both title and body')
      return
    }

    try {
      setSaving(true)

      if (editingId) {
       await updateNoteFn({
  data: {
    id: editingId,
    title,
    body,
    tag,
  },
});
      } else {
        await createNoteFn({
  data: {
    title,
    body,
    tag,
  },
});
      }

      clearForm()
      await loadNotes()
      router.invalidate()
    } catch (error) {
      console.error(error)
      alert('Could not save note')
    } finally {
      setSaving(false)
    }
  }

  // Edit
  const handleEdit = (note: Note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setBody(note.body)
    setTag(note.tag)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /// Delete
const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this note?"
  )

  if (!confirmed) return

  try {
    await deleteNoteFn({
      data: {
        id,
      },
    })

    await loadNotes()
    router.invalidate()
  } catch (error) {
    console.error("Failed to delete note:", error)
    alert("Could not delete note")
  }
}

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <header
          style={{
            marginBottom: '30px',
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              marginBottom: '8px',
              color: '#111827',
            }}
          >
            📝 My Notes
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '16px',
            }}
          >
            Create, edit and manage your personal notes.
          </p>
        </header>

        {/* Create/Edit Form */}
        <section
          style={{
            background: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            marginBottom: '30px',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              color: '#111827',
            }}
          >
            {editingId ? 'Edit Note' : 'Create a Note'}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <input
              type="text"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />

            {/* Body */}
            <textarea
              placeholder="Write your note..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />

            {/* Tag */}
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as Tag)}
              style={{
                padding: '11px',
                marginBottom: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
              }}
            >
              <option value="PERSONAL">PERSONAL</option>
              <option value="WORK">WORK</option>
              <option value="IDEA">IDEA</option>
            </select>

            <div>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: '15px',
                }}
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Update Note'
                    : 'Add Note'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={clearForm}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '15px',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Notes */}
        <section>
          <h2
            style={{
              color: '#111827',
            }}
          >
            Your Notes
          </h2>

          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <div
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              No notes yet. Create your first note above.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gap: '15px',
              }}
            >
              {notes.map((note) => (
                <article
                  key={note.id}
                  style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '15px',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          margin: '0 0 8px',
                          color: '#111827',
                          fontSize: '20px',
                        }}
                      >
                        {note.title}
                      </h3>

                      <span
                        style={{
                          display: 'inline-block',
                          background: '#e5e7eb',
                          padding: '4px 9px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        {note.tag}
                      </span>

                      <p
                        style={{
                          color: '#4b5563',
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.6',
                          margin: 0,
                        }}
                      >
                        {note.body}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '18px',
                      borderTop: '1px solid #e5e7eb',
                      paddingTop: '12px',
                    }}
                  >
                    <button
                      onClick={() => handleEdit(note)}
                      style={{
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginRight: '8px',
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      style={{
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}