import "server-only";
import { cache } from "react";
import { db } from "@/db";
import { settings as settingsTable } from "@/db/schema";
import { mergeSettings, type SiteSettings } from "./site-settings";

/** Paramètres du site lus en base (repli sur les valeurs par défaut). */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const rows = await db.select().from(settingsTable);
    const stored: Record<string, unknown> = {};
    for (const row of rows) stored[row.key] = row.value;
    return mergeSettings(stored as Partial<SiteSettings>);
  } catch {
    return mergeSettings(null);
  }
});
