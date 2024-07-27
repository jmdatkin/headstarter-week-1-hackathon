CREATE TABLE `homework` (
	`id` text PRIMARY KEY NOT NULL,
	`material_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`questions` text NOT NULL,
	`created_at` integer NOT NULL
);
