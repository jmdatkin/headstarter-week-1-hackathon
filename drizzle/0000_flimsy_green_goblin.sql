CREATE TABLE `announcements` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`title` text NOT NULL,
	`text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `assignment_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`assignment_id` text NOT NULL,
	`user_id` text NOT NULL,
	`score` text NOT NULL,
	`submitted_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`material_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` text PRIMARY KEY NOT NULL,
	`grade_level_id` text NOT NULL,
	`org_id` text,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `grade_levels` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `materials` (
	`id` text PRIMARY KEY NOT NULL,
	`active_at` integer NOT NULL,
	`due_at` integer NOT NULL,
	`unit_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quiz_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`quiz_id` text NOT NULL,
	`user_id` text NOT NULL,
	`submitted_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`material_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`due_at` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reading_material_views` (
	`id` text PRIMARY KEY NOT NULL,
	`reading_material_id` text NOT NULL,
	`user_id` text NOT NULL,
	`submitted_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reading_materials` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`material_id` text NOT NULL,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` text PRIMARY KEY NOT NULL,
	`class_id` text NOT NULL,
	`name` text DEFAULT ''
);
