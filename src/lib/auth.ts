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

  trustedOrigins: [
    "http://localhost:3000",
    "https://notes-app-nine-wheat.vercel.app",
  ],

  plugins: [tanstackStartCookies()],
});