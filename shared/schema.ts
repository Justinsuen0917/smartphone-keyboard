import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const colorThemeSchema = z.object({
  background: z.string(),
  text: z.string(),
  keys: z.string(),
  accent: z.string()
});

export type ColorTheme = z.infer<typeof colorThemeSchema>;

export const keyboardThemes = pgTable("keyboard_themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  colors: jsonb("colors").$type<ColorTheme>().notNull(),
  isTimeTheme: text("is_time_theme").default("false"),
});

export const insertKeyboardThemeSchema = createInsertSchema(keyboardThemes).pick({
  name: true,
  colors: true,
  isTimeTheme: true,
});

export type InsertKeyboardTheme = z.infer<typeof insertKeyboardThemeSchema>;
export type KeyboardTheme = typeof keyboardThemes.$inferSelect;
