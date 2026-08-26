# ✦ NoteFlow

A modern full-stack Notes Management application where users can securely create, organize, edit, and manage their notes.

NoteFlow provides user authentication and allows every user to manage their own collection of notes with different categories.

---

## ✨ Features

### 🔐 Authentication

- User registration
- Secure sign in
- Secure sign out
- User-based note management
- Personalized username display

### 📝 Notes Management

- Create new notes
- Edit existing notes
- Delete individual notes
- Select multiple notes
- Select all notes
- Delete selected notes
- Notes are associated with the logged-in user

### 🏷️ Categories

Notes can be organized into:

- 🌿 Personal
- 💼 Work
- 📚 Study

### 🎨 User Interface

- Modern responsive design
- Animated background elements
- Clean note cards
- Loading states
- Empty state for new users
- Smooth editing experience

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router

### Authentication

- Better Auth
- Better Auth React Client

### Database

- PostgreSQL
- Neon Serverless PostgreSQL
- Drizzle ORM

### Development Tools

- Node.js
- npm
- Git
- GitHub

---

## 📂 Project Structure

```text
notes-app/
│
├── drizzle/
│   ├── meta/
│   └── migrations/
│
├── src/
│   ├── db/
│   │   ├── index.ts
│   │   └── schema.ts
│   │
│   ├── lib/
│   │   └── auth-client.ts
│   │
│   ├── routes/
│   │   ├── api/
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   └── __root.tsx
│   │
│   ├── server/
│   │   ├── auth.ts
│   │   ├── function.ts
│   │   └── notes.ts
│   │
│   └── styles.css
│
├── drizzle.config.ts
├── package.json
├── package-lock.json
├── .env.example
└── README.md