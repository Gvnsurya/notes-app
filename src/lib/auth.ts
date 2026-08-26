import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

  plugins: [tanstackStartCookies()],
});