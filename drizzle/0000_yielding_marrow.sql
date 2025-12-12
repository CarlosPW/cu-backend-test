CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"state" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
