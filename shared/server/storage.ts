im// This is a temporary change for cleanupport { keyboardThemes, type KeyboardTheme, type InsertKeyboardTheme } from "@shared/schema";

export interface IStorage {
  getThemes(): Promise<KeyboardTheme[]>;
  getTheme(id: number): Promise<KeyboardTheme | undefined>;
  createTheme(theme: InsertKeyboardTheme): Promise<KeyboardTheme>;
  deleteTheme(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private themes: Map<number, KeyboardTheme>;
  private currentId: number;

  constructor() {
    this.themes = new Map();
    this.currentId = 1;
  }

  async getThemes(): Promise<KeyboardTheme[]> {
    return Array.from(this.themes.values());
  }

  async getTheme(id: number): Promise<KeyboardTheme | undefined> {
    return this.themes.get(id);
  }

  async createTheme(insertTheme: InsertKeyboardTheme): Promise<KeyboardTheme> {
    const id = this.currentId++;
    const theme: KeyboardTheme = { ...insertTheme, id };
    this.themes.set(id, theme);
    return theme;
  }

  async deleteTheme(id: number): Promise<void> {
    this.themes.delete(id);
  }
}

export const storage = new MemStorage();
