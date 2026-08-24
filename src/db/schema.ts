import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const tagEnum = pgEnum('tag', ['PERSONAL', 'WORK', 'IDEA'])

export const notes = pgTable('notes', {
  id: text('id').primaryKey(),

  title: varchar('title', { length: 120 }).notNull(),

  body: text('body').notNull(),

  tag: tagEnum('tag').default('PERSONAL').notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  })
    .defaultNow()
    .notNull(),
})