CREATE TABLE `check_in` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`check_in_date` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercise` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`unit` text NOT NULL,
	`remarks` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `training_log_detail` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`training_log_id` text NOT NULL,
	`set_number` integer NOT NULL,
	`reps` integer,
	`time` integer,
	`distance` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`training_log_id`) REFERENCES `training_log`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `training_log` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`training_menu_id` text NOT NULL,
	`status` text NOT NULL,
	`remarks` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`training_menu_id`) REFERENCES `training_menu`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `training_menu` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`exercise_id` text NOT NULL,
	`menu_name` text NOT NULL,
	`sets` integer NOT NULL,
	`reps_per_set` integer,
	`time_per_set` integer,
	`distance_per_set` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`display_name` text,
	`email` text NOT NULL,
	`avatar_url` text,
	`bio` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);