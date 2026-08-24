CREATE TYPE "public"."tag" AS ENUM('PERSONAL', 'WORK', 'IDEA');--> statement-breakpoint
CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(120) NOT NULL,
	"body" text NOT NULL,
	"tag" "tag" DEFAULT 'PERSONAL' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
