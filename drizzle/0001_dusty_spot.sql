ALTER TABLE `reading_materials` ADD `holy_book` text NOT NULL;--> statement-breakpoint
ALTER TABLE `reading_materials` ADD `chapter` text NOT NULL;--> statement-breakpoint
ALTER TABLE `reading_materials` ADD `start_verse` text NOT NULL;--> statement-breakpoint
ALTER TABLE `reading_materials` ADD `end_verse` text NOT NULL;--> statement-breakpoint
ALTER TABLE `reading_materials` ADD `created_at` integer NOT NULL;