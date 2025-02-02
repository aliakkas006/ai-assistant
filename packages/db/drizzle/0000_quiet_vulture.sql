CREATE TABLE IF NOT EXISTS "professionals" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"org_or_prac_id" varchar(255) NOT NULL,
	"username_or_business_url" varchar(255),
	"name" varchar(255) NOT NULL,
	"ranking" integer DEFAULT 0,
	"photo_url" varchar(255),
	"category" varchar(255) NOT NULL,
	"sub_category" text[] NOT NULL,
	"rating" numeric(2, 1),
	"total_appointments" integer DEFAULT 0,
	"zone" text[] NOT NULL,
	"branch" text[] NOT NULL,
	"area_of_practice" text NOT NULL
);
