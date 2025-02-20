import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertKeyboardThemeSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/themes", async (_req, res) => {
    const themes = await storage.getThemes();
    res.json(themes);
  });

  app.post("/api/themes", async (req, res) => {
    const result = insertKeyboardThemeSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid theme data" });
      return;
    }

    const theme = await storage.createTheme(result.data);
    res.json(theme);
  });

  app.delete("/api/themes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    await storage.deleteTheme(id);
    res.status(204).end();
  });

  return createServer(app);
}
